import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

export default class TempForm extends React.Component {
  static navigationOptions = {
    title: 'Form'
  };
  render() {
    const { navigation: { state: { params } } } = this.props;
    console.log('TempForm', { params });
    return (
      <View>
        <Text>Temp Form</Text>
      </View>
    );
  }
}
