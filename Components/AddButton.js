import React from 'react';
import styles from './../style';
import { TouchableOpacity, Text } from 'react-native';

const AddButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.addButton, { marginBottom: 12 }]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
