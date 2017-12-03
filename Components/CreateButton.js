import React from "react";
import style from "./../style";
import { TouchableOpacity, Text } from "react-native";

const CreateButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[style.createButton]}>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CreateButton;
