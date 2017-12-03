import React from "react";
import { Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import styles from './styles/style';
import { StackNavigator } from "react-navigation";
import { IntuitAuth, Main, FormBuilder } from "./Components";
const t = require("tcomb-form-native");
const Form = t.form.Form;
import { Text, View, Button, Alert } from "react-native";
import { StackNavigator } from "react-navigation";
import { IntuitAuth, Main, FormBuilder } from "./Components";
import RootNavigator from "./navigation/RootNavigator";
import { getUser } from "./helpers/storage";
import QBClient, { fetchTokenWithRefreshToken } from "./helpers/quickbooks";
const Form = t.form.Form;
const t = require("tcomb-form-native");
const qbClient = new QBClient();

const Person = t.struct({
  name: t.String, // a required string
  surname: t.maybe(t.String), // an optional string
  age: t.Number, // a required number
  rememberMe: t.Boolean // a boolean
});

const options = {}; // optional rendering options (see documentation)

class App extends React.Component {
  state = { user: null };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({ user });
    } catch (err) {
      console.log("error getting user", err);
    }
  }

  onCreateForm = form => {
    console.log(form);
  };

  render() {
    const { user } = this.state;
    const connected =
      user && user.qb && user.qb.realmId && user.qb.refresh_token;
    return (
      <View style={[styles.container]}>

        {/* {connected && (
          <Button
            onPress={this._makeRequest}
            title={'Make a Request to the QB API'}
          />
        )}
        {connected && (
          <Button onPress={this._refreshToken} title={'Test Refresh'} />
        )}
      <Button onPress={this._skip} title={'Skip'} /> */}
        <TouchableOpacity style={styles.button} />
        <Form ref="form" type={Person} options={options} />      
        <Button onPress={this._skip} title={'Skip'} /> */}
        <FormBuilder onCreateForm={form => this.onCreateForm(form)} />
      </View>
    );
  }

  _makeRequest = () => {
    const { user } = this.state;
    qbClient
      .get("account/1", {}, user.qb)
      .then(r => {
        Alert.alert("Request Success", JSON.stringify(r, null, 2));
      })
      .catch(console.warn);
  };

  _refreshToken = () => {
    const { user } = this.state;
    fetchTokenWithRefreshToken(user.qb)
      .then(r => {
        Alert.alert("Refresh Success", JSON.stringify(r, null, 2));
      })
      .catch(console.warn);
  };

  _connectIntuit = () => {
    this.props.navigation.navigate("Login");
  };

  _skip = () => {
    this.props.navigation.navigate("Main");
  };
}

export default App;
// StackNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Login: {
//     screen: IntuitAuth
//   },
//   Main: {
//     screen: Main
//   }
// });
