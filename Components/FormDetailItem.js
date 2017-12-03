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
  numberInput: "Number Input",
  textInput: "Text Input",
  multipleChoice: "Multiple Choice"
});

var Item = t.struct({
  inputType: InputType // enum
});

var options = {
  fields: {
    inputType: {
      hidden: true
    }
  }
};

class FormItem extends React.Component {
  state = {
    user: null
  };

  render() {
    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 40 }}>
        <Text style={{ fontWeight: "400", fontSize: 20 }}>
          {this.props.value.infoText}
        </Text>
        <Form type={this.props.value.inputThing} options={this.props.options} />
      </View>
    );
  }
}

export default FormItem;
