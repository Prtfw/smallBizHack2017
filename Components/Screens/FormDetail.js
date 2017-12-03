import React from 'react';
const t = require('tcomb-form-native');
const Form = t.form.Form;
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Linking
} from 'react-native';
import FormDetailItem from '../FormDetailItem';
import CreateButton from '../CreateButton';
import AddButton from "../AddButton";

const options = {
  fields: {
    inputType: {
      label: ' '
    }
  }
};

const FormItem1 = {
  infoText: 'Is the client annoying?',
  inputThing: t.struct({
    inputType: t.Boolean // a boolean
  })
};

const FormItem2 = {
  infoText: 'Do they need a data base?',
  inputThing: t.struct({
    inputType: t.Boolean // a boolean
  })
};

const FormItem3 = {
  infoText: "What is the client's budget?",
  inputThing: t.struct({
    inputType: t.Number // a boolean
  })
};

class FormDetail extends React.Component {
  state = {
    formItems: [FormItem1, FormItem2, FormItem3],
    quoteOpacity: 0
  };

  createQuoteButtonPressed = () => {
    this.setState({ quoteOpacity: 100 });
  };

  showPayView = () => {
    const url =
      'https://connect.squareup.com/v2/checkout?c=CBASENS8gJhk0OHXOXn8cn3oJtEgAQ&l=CBASEIqTooINQnShc9Y1kEhwJcEgAQ';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <ScrollView
          style={{
            flex: 1
          }}
        >
          {this.state.formItems.map((formItem, index) => (
            <FormDetailItem
              key={index}
              value={formItem}
              options={options}
              text={'test'}
            />
          ))}
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
            {'Your quote is $20,000'}
          </Text>
          <CreateButton title={'Pay link'} onPress={() => this.showPayView()} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default FormDetail;
