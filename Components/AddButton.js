import React from "react";
import style from "./../style";
import { TouchableOpacity, Text } from "react-native";

const AddButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={style.addButton}>
      <Text style={style.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
