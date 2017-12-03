import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
const t = require('tcomb-form-native');
const Form = t.form.Form;

// import FormDetailScreen from './FormDetail';

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
          help: 'Your help message here'
        }
      }
    };
    this.state = {
      type: t.struct(
        schema.reduce((s, item) => {
          s[item.name] = t[item.inputType];
          return s;
        }, {})
      ),
      options: {
        fields: schema.reduce((s, item) => {
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
      <View>
        <Form type={type} options={options} />
      </View>
    );
  }
}
