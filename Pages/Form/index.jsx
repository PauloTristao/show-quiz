import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Form({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Form</Text>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
