import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
// import styles from "./Styles";

function Button({ text, handleClick, style }) {
  return (
    <TouchableOpacity style={style} onPress={() => handleClick()}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
