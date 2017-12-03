import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
const t = require('tcomb-form-native');
const Form = t.form.Form;

export default class TempForm extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return { title: params && params.name };
  };

  constructor(props) {
    super(props);
    const { navigation: { state: { params: { schema } } } } = props;

    this.state = {
      schema: t.struct(
        schema.reduce((s, item) => {
          s[item.name] = t[item.inputType];
          return s;
        }, {})
      )
    };
  }
  render() {
    const { navigation: { state: { params } } } = this.props;
    const { schema } = this.state;
    // console.log('TempForm', { params, schema });
    return (
      <View>
        <Form type={schema} />
      </View>
    );
  }
}
