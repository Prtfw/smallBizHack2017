import React from 'react';
import { Text, View, Button, WebView } from 'react-native';

import {
  authorizationUrl,
  redirectUrl,
  fetchTokenWithAuthorizationCode,
  QBClient
} from '../../helpers/quickbooks';

const qs = require('querystring');

export default class IntuitAuth extends React.Component {
  static navigationOptions = {
    title: 'Sign in with Intuit'
  };

  state = {
    url: authorizationUrl
  };

  _onNavigationStateChange = navState => {
    const { url } = navState;
    console.log('onNavigationStateChange', url);
    if (url.indexOf(redirectUrl) === 0) {
      const questionMarkIndex = url.indexOf('?');
      const queryString = url.substring(questionMarkIndex + 1);
      options = qs.parse(queryString);
      console.log({ options });
      this.setState({ url: null });
      if (options.error) {
        let message;
        switch (options.error) {
          case 'access_denied':
            message = 'The user did not authorize the request.';
            break;
          case 'invalid_scope':
            message = 'An invalid scope string was sent in the request.';
            break;
          default:
            message = 'Authorization failed.';
        }
        Alert.alert('Failed!', message);
      } else {
        fetchTokenWithAuthorizationCode(options)
          .then(authParams => {
            console.log('fetchTokenWithAuthorizationCode success?', authParams);
          })
          .catch(console.warn);
      }
    }
  };

  render() {
    const { url } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {url && (
          <WebView
            source={{ uri: url }}
            onNavigationStateChange={this._onNavigationStateChange}
            decelerationRate="normal"
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled
            domStorageEnabled={false}
            startInLoadingState
            scalesPageToFit
          />
        )}
      </View>
    );
  }
}
