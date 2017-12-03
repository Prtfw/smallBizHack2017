const request = require("request");
const url = "https://connect.squareup.com/v2/locations/CBASEIqTooINQnShc9Y1kEhwJcEgAQ/checkouts";
const requestData = {
  redirect_url: "http://yahoo.ca",
  idempotency_key: "xxx7777x",
  ask_for_shipping_address: false,
  merchant_support_email: "mns_catdogmice@yahoo.ca",
  order: {
    reference_id: "{222",
    line_items: [
      {
        name: "flooring",
        quantity: "2",
        base_price_money: {
          amount: 100000,
          currency: "USD",
        },
      },
    ],
  },
  pre_populate_buyer_email: "mns_catdogmice@yahoo.ca",
};

request(
  {
    url: url,
    method: "POST",
    json: requestData,
    header: {
      "content-type": "application/json",
      access_token: "sandbox-sq0atb-ZV25PEBYRvbugnyFeUjT5A",
    },
  },
  function(err, resp, body) {
    if (err) console.log("err", err);
    if (body) console.log("bd", body);
  },
);
