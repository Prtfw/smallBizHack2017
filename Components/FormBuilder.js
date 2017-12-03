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
import AddButton from "./AddButton";
import CreateButton from "./CreateButton";

const Person = t.struct({
  name: t.String, // a required string
  surname: t.maybe(t.String), // an optional string
  age: t.Number, // a required number
  rememberMe: t.Boolean // a boolean
});

const options = {}; // optional rendering options (see documentation)

const defaultItem = { name: "", description: "", inputType: "" };

class FormBuilder extends React.Component {
  static navigationOptions = {
    title: "Form Builder"
  };

  state = {
    user: null,
    formItems: [defaultItem]
  };

  addFormItem = () => {
    const items = this.state.formItems;
    items.push(defaultItem);
    this.setState({ formItems: items });
  };

  createForm = () => {
    this.props.onCreateForm(this.state.formItems);
    this.setState({ formItems: [defaultItem] });
  };

  onChange = (formItem, index) => {
    const items = this.state.formItems;
    items[index] = formItem;
    this.setState({ formItems: items });
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
          {this.state.formItems.map((formItem, index) => (
            <FormItem
              key={index}
              value={formItem}
              onChange={formItem => this.onChange(formItem, index)}
            />
          ))}

          <AddButton
            onPress={() => this.addFormItem()}
            title={"Add new item"}
          />
          <CreateButton
            onPress={() => this.createForm()}
            title={"Create form"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default FormBuilder;
