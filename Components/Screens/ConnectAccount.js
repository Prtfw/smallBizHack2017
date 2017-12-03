import React from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { getUser } from '../../helpers/storage';
import QBClient, { fetchTokenWithRefreshToken } from '../../helpers/quickbooks';
const qbClient = new QBClient();

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: '#00aebe',
    marginBottom: 12
  },
  buttonText: {
    color: '#fff'
  }
});

const CustomButton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default class ConnectAccount extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };
  state = { user: null };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({ user });
    } catch (err) {
      console.log('error getting user', err);
    }
  }

  render() {
    const { user } = this.state;
    const connected =
      user && user.qb && user.qb.realmId && user.qb.refresh_token;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          {connected && (
            <CustomButton
              onPress={this._makeRequest}
              title={'Test Quickbooks API'}
            />
          )}
          {connected && (
            <CustomButton onPress={this._refreshToken} title={'Test Refresh'} />
          )}
          <CustomButton
            onPress={this._connectIntuit}
            title={'Connect to QuickBooks'}
          />
        </View>
      </View>
    );
  }

  _makeRequest = () => {
    const { user } = this.state;
    qbClient
      .get('account/1', {}, user.qb)
      .then(r => {
        Alert.alert('Request Success', JSON.stringify(r, null, 2));
      })
      .catch(console.warn);
  };

  _refreshToken = () => {
    const { user } = this.state;
    fetchTokenWithRefreshToken(user.qb)
      .then(r => {
        Alert.alert('Refresh Success', JSON.stringify(r, null, 2));
      })
      .catch(console.warn);
  };

  _connectIntuit = () => {
    this.props.navigation.navigate('Login');
  };
}
