import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: '#4a4a4a',
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: '#fff'
  }
});

class FormList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <Ionicons
        style={{ fontSize: 30, padding: 12 }}
        name="md-add"
        onPress={params.add ? params.add : () => null}
      />
    );

    return { headerRight };
  };

  state = {
    forms: [
      {
        name: 'Form 1',
        schema: [
          {
            name: 'hasBackend',
            label: 'Does the site need a backend?',
            type: 'Boolean',
            isOptional: false
          },
          {
            name: 'hasDesign',
            label: 'Do you already have a design?',
            type: 'Boolean',
            isOptional: false
          }
        ]
      },
      {
        name: 'Form 2',
        schema: [
          {
            name: 'isInteractive',
            label: 'Does the site need to be interactive?',
            type: 'Boolean',
            isOptional: false
          },
          {
            name: 'timeline',
            label: 'How fast do you need it?',
            type: 'String',
            isOptional: false
          }
        ]
      }
    ]
  };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ add: this.openFormBuilder });
  }

  render() {
    const { forms } = this.state;
    const data = forms.map((f, i) => ({ ...f, key: i }));
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.text}>{item.name}</Text>
              <TouchableOpacity onPress={() => this.openForm(item)}>
                <Entypo
                  name="chevron-with-circle-right"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
  openForm = formSchema => {
    this.props.navigation.navigate('Form', formSchema);
  };

  openFormBuilder = () => {
    this.props.navigation.navigate('FormBuilder');
  };
}

export default FormList;
