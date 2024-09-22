import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";


function FinalResult({ navigation }) {
  const [result, setResult] = useState(0);


  return (
    <View style={styles.container}>
      <Text>FinalResult</Text>
      <Text>Você acertou {result} de X questões</Text>
      <Button
          title={"Revisar questões"}
          onPress={() => navigation.navigate("GameConfig")}
          style={styles.button}
        ></Button>
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
