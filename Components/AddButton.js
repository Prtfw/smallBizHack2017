import React from "react";
import { TouchableOpacity, Text } from "react-native";

const AddButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
