import React from "react";
import { TouchableOpacity, Text } from "react-native";

function Button({ text, handleClick, style, textStyle }) {
  return (
    <TouchableOpacity style={style} onPress={() => handleClick()}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
