import React from "react";
const t = require("tcomb-form-native");
const Form = t.form.Form;
import { Text, View, Button, Alert } from "react-native";

import { StackNavigator } from "react-navigation";

import { IntuitAuth, Main } from "./Components";

import { getUser } from "./helpers/storage";
import { estimate } from "./testEstimateCall";
import QBClient, { fetchTokenWithRefreshToken } from "./helpers/quickbooks";
const qbClient = new QBClient();

const Person = t.struct({
  name: t.String, // a required string
  surname: t.maybe(t.String), // an optional string
  age: t.Number, // a required number
  rememberMe: t.Boolean, // a boolean
});

const options = {}; // optional rendering options (see documentation)

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
  };

  state = { user: null };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({ user });
    } catch (err) {
      console.log("error getting user", err);
    }
  }

  render() {
    const { user } = this.state;
    const connected = user && user.qb && user.qb.realmId && user.qb.refresh_token;
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        {connected && <Button onPress={this._makeRequest} title={"Make a Request to the QB API"} />}
        {connected && <Button onPress={this._refreshToken} title={"Test Refresh"} />}
        <Button onPress={this._connectIntuit} title={"Connect to QuickBooks"} />
        <Button onPress={this._skip} title={"Skip"} />
        {/* <Form ref="form" type={Person} options={options} /> */}
      </View>
    );
  }

  _makeRequest = () => {
    const { user } = this.state;
    // qbClient
    //   .get("account/1", {}, user.qb)
    //   .then(r => {
    //     Alert.alert("Request Success", JSON.stringify(r, null, 2));
    //   })
    //   .catch(console.warn);
    qbClient
      .post("/estimate", { data: estimate }, user.qb)
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

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: IntuitAuth,
  },
  Main: {
    screen: Main,
  },
});
