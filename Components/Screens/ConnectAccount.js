import React from "react";
import { Text, View, Button, Alert } from "react-native";
import { getUser } from "../../helpers/storage";
import QBClient, { fetchTokenWithRefreshToken } from "../../helpers/quickbooks";
const qbClient = new QBClient();
import { estimate } from "./testEstimateCall";

export default class ConnectAccount extends React.Component {
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
      <View style={{ flex: 1 }}>
        {connected && <Button onPress={this._makeRequest} title={"Make a Request to the QB API"} />}
        {connected && <Button onPress={this._refreshToken} title={"Test Refresh"} />}
        <Button onPress={this._connectIntuit} title={"Connect to QuickBooks"} />
      </View>
    );
  }

  _makeRequest = () => {
    const { user } = this.state;
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
}
