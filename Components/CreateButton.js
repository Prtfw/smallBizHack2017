import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CreateButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CreateButton;
