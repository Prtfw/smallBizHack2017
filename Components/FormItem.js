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

var InputType = t.enums({
  checkbox: "Checkbox",
  boolean: "Boolean",
  textInput: "Text Input",
  multipleChoice: "Multiple Choice"
});

var Item = t.struct({
  name: t.String,
  description: t.maybe(t.String),
  inputType: InputType // enum
});

const options = {}; // optional rendering options (see documentation)

class FormItem extends React.Component {
  state = {
    user: null
  };

  render() {
    return (
      <View>
        <Form
          value={this.props.value}
          type={Item}
          onChange={this.props.onChange}
        />
      </View>
    );
  }
}

export default FormItem;
