import React from "react";
import style from "./../style";
import { TouchableOpacity, Text } from "react-native";

const AddButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={style.container}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
