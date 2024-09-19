import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./Styles";

function Button({ text, handleClick }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handleClick()}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
