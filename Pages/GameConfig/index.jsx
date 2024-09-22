import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import DropdownComponent from "../Components/DropdownComponent";
import { ThemeContext } from "../../context/ThemeContext";
import { QuestionContext } from "../../context/QuestionContext";

function GameConfig({ navigation }) {
  const {themes} = useContext(ThemeContext);
  const {questions} = useContext(QuestionContext);

  //const [questions, setQuestions] = useState(null);
  //const [themes, setThemes] = useState(null);

  const [quantity, setQuantity] = useState(0) //Quantidade de perguntas desejadas
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {}, [questions]);
  useEffect(() => {}, [themes]);


  const themesData = themes.map((theme) =>({
    label: theme.description,
    value: theme.themeId, 
  }))

  // Verificar se está funcionando. Lógica: Filtrar todas as possíveis questões
  // que possui o mesmo ID do selecionado no DropDown
  const possibleQuestions = questions
  .filter((question) => question.themeId === selectedValue)
  .map((question) => ({
    value: question.questionId,
  }))



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
        data={themesData}
        style={styles.dropdown}
        setSelectedLabel={setSelectedLabel}
        selectedValue={selectedLabel}
        setSelectedValue={setSelectedValue}
      />
    <View style={styles.inputQuestions}>
      <Text style={styles.label}>Digite a quantidade de perguntas desejadas:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Número de perguntas"
      />
      <Text styles={styles.label}>Quantidade de perguntas disponíveis: {possibleQuestions.length} </Text>
    </View>
      {selectedValue && (possibleQuestions.length >= quantity) && quantity > 0 && (
        <Button
          title={"Iniciar novo jogo"}
          handleClick={() => navigation.navigate("Game")}
          style={styles.button}
        ></Button>
      )}
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
    inputQuestions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
