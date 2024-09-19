import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../Components/Button";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        text={"Question Form"}
        handleClick={() => navigation.navigate("Form")}
      ></Button>
      <View style={{ marginTop: 10 }}></View>
      <Button
        text={"Play"}
        handleClick={() => navigation.navigate("GameConfig")}
      ></Button>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
