import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropdownComponent from "../Components/DropdownComponent";

function GameConfig({ navigation }) {
  const [questions, setQuestions] = useState(null);
  const [themes, setThemes] = useState(null);

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {}, [questions]);
  useEffect(() => {}, [themes]);

  const data = [
    { label: "Questions", value: 1 },
    { label: "Themes", value: 2 },
  ];

  // async function carregaDados() {
  //   try {
  //     console.log("carregando");
  //     let questions = await questionservice.getAllQuestions();
  //     setQuestions(questions);
  //   } catch (e) {
  //     Alert.alert(e.toString());
  //   }
  // }

  return (
    <View style={styles.container}>
      <DropdownComponent
        data={data}
        style={styles.dropdown}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
      />
      {selectedValue && (
        <Button
          text={`Cadastrar novo ${selectedValue ? selectedValue : ""}`}
          handleClick={() => navigation.navigate("GameConfig")}
          style={styles.button}
        ></Button>
      )}
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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: "80%",
  },
});
