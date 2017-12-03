import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

import FormBuilder from './FormBuilder';

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

const getInputType = inputType => {
  switch (inputType) {
    case 'checkbox':
      return 'Boolean';
    case 'textInput':
      return 'String';
    case 'number':
      return 'Number';
    default:
      return 'String';
  }
};

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
    showFormBuilder: false,
    forms: [
      {
        name: 'Form 1',
        schema: [
          {
            name: 'hasBackend',
            description: 'Does the site need a backend?',
            inputType: 'Boolean',
            isOptional: false
          },
          {
            name: 'hasDesign',
            description: 'Do you already have a design?',
            inputType: 'Boolean',
            isOptional: false
          }
        ]
      },
      {
        name: 'Form 2',
        schema: [
          {
            name: 'isInteractive',
            description: 'Does the site need to be interactive?',
            inputType: 'Boolean',
            isOptional: false
          },
          {
            name: 'timeline',
            description: 'How fast do you need it?',
            inputType: 'String',
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
    const { forms, showFormBuilder } = this.state;
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
        <Modal visible={showFormBuilder} onRequestClose={this.closeFormBuilder}>
          <View
            style={{
              height: 44,
              alignItems: 'flex-end'
            }}
          >
            <Ionicons
              name="ios-close-circle-outline"
              style={{ padding: 12, fontSize: 30 }}
              onPress={this.closeFormBuilder}
            />
          </View>
          <FormBuilder onCreateForm={this.addNewSchema} />
        </Modal>
      </View>
    );
  }
  openForm = formSchema => {
    this.props.navigation.navigate('Form', formSchema);
  };

  openFormBuilder = () => {
    // this.props.navigation.navigate('FormBuilder');
    this.setState({ showFormBuilder: true });
  };

  closeFormBuilder = () => {
    this.setState({ showFormBuilder: false });
  };

  addNewSchema = schema => {
    const newForm = {
      name: `Form ${this.state.forms.length + 1}`,
      schema: schema.map(s => {
        return {
          name: s.name,
          description: s.description,
          inputType: getInputType(s.inputType),
          isOptional: false
        };
      })
    };
    this.setState(prevState => ({
      forms: prevState.forms.concat(newForm),
      showFormBuilder: false
    }));
  };
}

export default FormList;
