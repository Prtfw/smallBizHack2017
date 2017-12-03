import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Linking
} from "react-native";
const t = require("tcomb-form-native");
const Form = t.form.Form;

import CreateButton from "../CreateButton";
import AddButton from "../AddButton";

export default class TempForm extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return { title: params && params.name };
  };

  constructor(props) {
    super(props);
    const { navigation: { state: { params: { schema } } } } = props;
    var options = {
      fields: {
        name: {
          help: "Your help message here"
        }
      }
    };
    this.state = {
      quoteOpacity: 0,
      type: t.struct(
        schema.reduce((s, item) => {
          s[item.name] = t[item.inputType];
          return s;
        }, {})
      ),
      options: {
        fields: schema.reduce((s, item) => {
          s[item.name] = {
            inputType: {
              hidden: true
            }
          };
          if (item.description) {
            s[item.name] = { help: item.description };
          }
          return s;
        }, {})
      }
    };
  }
  render() {
    const { navigation: { state: { params } } } = this.props;
    const { type, options } = this.state;
    // console.log('TempForm', { params, schema });
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            padding: 20
          }}
        >
          <Form type={type} options={options} />
          <AddButton
            title={"Generate Quote"}
            onPress={() => this.createQuoteButtonPressed()}
          />
          <Text
            style={{
              padding: 20,
              fontSize: 20,
              opacity: this.state.quoteOpacity
            }}
          >
            {"Your quote is $7500"}
          </Text>
          <CreateButton title={"Pay link"} onPress={() => this.showPayView()} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  createQuoteButtonPressed = () => {
    this.setState({ quoteOpacity: 100 });
  };

  showPayView = () => {
    const url =
      "https://connect.squareup.com/v2/checkout?c=CBASENS8gJhk0OHXOXn8cn3oJtEgAQ&l=CBASEIqTooINQnShc9Y1kEhwJcEgAQ";
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };
}
