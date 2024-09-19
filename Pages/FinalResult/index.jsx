import React from "react";
import { View, Text, StyleSheet } from "react-native";

function FinalResult({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>FinalResult</Text>
    </View>
  );
}

export default FinalResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
