import React from "react";
import { View, Text, StyleSheet } from "react-native";

function GameConfig({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>GameConfig</Text>
    </View>
  );
}

export default GameConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
