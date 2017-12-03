import React from "react";
import style from "./../style";
import { TouchableOpacity, Text } from "react-native";

const CreateButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[style.button]}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CreateButton;
