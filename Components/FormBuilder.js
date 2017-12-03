import React from "react";
const t = require("tcomb-form-native");
const Form = t.form.Form;
import {
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import FormItem from "./FormItem";

const Person = t.struct({
  name: t.String, // a required string
  surname: t.maybe(t.String), // an optional string
  age: t.Number, // a required number
  rememberMe: t.Boolean // a boolean
});

const options = {}; // optional rendering options (see documentation)

class FormBuilder extends React.Component {
  static navigationOptions = {
    title: "Form Builder"
  };

  state = {
    user: null
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }}
          />
          <FormItem />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default FormBuilder;
