const querystring = require("querystring");
const base64 = require("base-64");

import { setUser } from "./storage";

const QB = {
  clientID: "Q0kkWLOodOWocIvxA38jQLe6EiA7Ids8hZG9I5yhG2XXMFOdNg",
  clientSecret: "HOboYX5VwBr0C5vyNBiR6iGrvqkeUXfaICFBaNv4",
  discoveryDocument: {
    issuer: "https://oauth.platform.intuit.com/op/v1",
    authorization_endpoint: "https://appcenter.intuit.com/connect/oauth2",
    token_endpoint: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
    userinfo_endpoint: "https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo",
    revocation_endpoint: "https://developer.api.intuit.com/v2/oauth2/tokens/revoke",
    jwks_uri: "https://oauth.platform.intuit.com/op/v1/jwks",
    response_types_supported: ["code"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "email", "profile", "address", "phone"],
    token_endpoint_auth_methods_supported: ["client_secret_post", "client_secret_basic"],
    claims_supported: ["aud", "exp", "iat", "iss", "realmid", "sub"],
  },
};

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
  Authorization: "Basic " + base64.encode(QB.clientID + ":" + QB.clientSecret),
};
const authorizationEndpoint = QB.discoveryDocument.authorization_endpoint;
const tokenEndpoint = QB.discoveryDocument.token_endpoint;
const redirectUrl = "http://localhost:3000/intuit";

const credentials = {
  client_id: QB.clientID,
  scope: "com.intuit.quickbooks.accounting",
  response_type: "code",
  state: "yolo",
  redirect_uri: redirectUrl,
};

const authorizationUrl = `${authorizationEndpoint}?${querystring.stringify(credentials)}`;

function fetchToken(body, currentAuth) {
  console.log("fetchToken", { body, currentAuth });
  return fetch(tokenEndpoint, {
    method: "POST",
    headers,
    body: querystring.stringify(body),
  })
    .then(response => response.json())
    .then(result => {
      console.log("refreshToken result", result);
      if (result.error) {
      } else {
        const {
          access_token,
          refresh_token,
          expires_in,
          x_refresh_token_expires_in,
          token_type,
        } = result;
        const authParams = Object.assign({}, currentAuth, {
          access_token,
          refresh_token,
          expires_in,
          x_refresh_token_expires_in,
          token_type,
        });
        console.log("fetchToken", { authParams });
        if (authParams.realmId && authParams.refresh_token) {
          setUser({ qb: authParams });
        }
        return authParams;
      }
    })
    .catch(console.warn);
}

function fetchTokenWithAuthorizationCode(authParams) {
  const body = {
    grant_type: "authorization_code",
    code: authParams.code,
    redirect_uri: redirectUrl,
  };
  return fetchToken(body, authParams);
}

// The time to request a new access_token is when a QuickBooks Online API call returns a 401 error.
function fetchTokenWithRefreshToken(authParams) {
  const body = {
    grant_type: "refresh_token",
    refresh_token: authParams.refresh_token,
  };
  return fetchToken(body, authParams);
}

/*
Token storage best practices

In persistent storage, save the OAuth refresh_token and realmId, associating them with the user who is currently authorizing access.
Be sure to encrypt the refresh_token before saving it to persistent storage.
Then, decrypt the it and store it in volatile memory when you need to use it to refresh the access_token.

The access_token is supplied in the authorization header for every call to a QuickBooks Online API resource.
Store it in volatile memory so it is readily available during contexts in which calls to API resources are made.
Examples of these contexts include:

The life of a signed-in user session.
The life of a connection.
 */

const methods = ["get", "post", "put", "patch", "del"];

class QBClient {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers } = {}, authParams) => {
        const baseUrl = "https://sandbox-quickbooks.api.intuit.com";

        let url = `${baseUrl}/v3/company/${authParams.realmId}/${path}`;

        const defaultHeaders = {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json", // '*/*'
          Authorization: "Bearer " + authParams.access_token,
        };

        const req = {
          method: method.toUpperCase(),
          headers: defaultHeaders,
        };

        if (params) {
          url += `?${querystring.stringify(params)}`;
        }

        if (data) {
          req.body = JSON.stringify(data); //querystring.stringify(data);
        }

        if (headers) {
          req.headers = Object.assign({}, defaultHeaders, headers);
        }

        return new Promise((resolve, reject) => {
          fetch(url, req)
            .then(response => {
              if (response.status === 401) {
                console.log("QBClient need to rerequest token");
                fetchTokenWithRefreshToken(authParams)
                  .then(newAuth => {
                    console.log("newAuth", newAuth);
                    const newHeaders = {
                      ...req.headers,
                      Authorization: "Bearer " + newAuth.access_toke,
                    };
                    const newReq = {
                      ...req,
                      headers: newHeaders,
                    };
                    return fetch(url, newReq).then(response => response.json());
                  })
                  .catch(reject);
              } else {
                console.log(166, "response", response);
                return response.json();
              }
            })
            .then(result => {
              console.log("QBClient result", result);
              resolve(result);
            })
            .catch(err => {
              console.warn("QBClient error", err);
              reject(err);
            });
        });
      };
    });
  }
}

export {
  authorizationUrl,
  redirectUrl,
  fetchTokenWithAuthorizationCode,
  fetchTokenWithRefreshToken,
};

export default QBClient;
