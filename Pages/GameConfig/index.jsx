import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DropdownComponent from "../Components/DropdownComponent";
import { ThemeContext } from "../../context/ThemeContext";
import { QuestionContext } from "../../context/QuestionContext";
import { AnswerContext } from "../../context/AnswerContext";
import Button from "../Components/Button";

function GameConfig({ navigation }) {
  const { themes } = useContext(ThemeContext);
  const { questions } = useContext(QuestionContext);
  const { answers, answersGame, setAnswersGame } = useContext(AnswerContext);

  const [quantity, setQuantity] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [possibleQuestions, setPossibleQuestions] = useState(0);

  useEffect(() => {}, [questions]);
  useEffect(() => {}, [themes]);

  const themesData = themes.map((theme) => ({
    label: theme.description,
    value: theme.themeId,
  }));

  useEffect(() => {
    setPossibleQuestions(
      questions
        .filter((question) => question.themeId === selectedValue)
        .map((question) => ({
          value: question.questionId,
        }))
    );
  }, [selectedValue]);

  function generateRandomNumbers(size, quantity) {
    const numerosAleatorios = [];
    for (let i = 0; i < quantity; i++) {
      const numero = Math.floor(Math.random() * size);
      if (!numerosAleatorios.some((num) => num === numero)) {
        numerosAleatorios.push(numero);
      } else {
        i = i - 1;
      }
    }
    return numerosAleatorios;
  }

  function generateQuestions() {
    const numerosAleatorios = generateRandomNumbers(
      possibleQuestions.length,
      quantity
    );
    const questions = [];

    for (let i = 0; i < numerosAleatorios.length; i++) {
      questions.push(possibleQuestions[numerosAleatorios[i]]);
    }

    setAnswersGame([]);
    navigation.navigate("Game", { questionsId: questions });
  }

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
        <Text style={styles.label}>
          Digite a quantidade de perguntas desejadas:
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Número de perguntas"
        />
        <Text styles={styles.label}>
          Quantidade de perguntas disponíveis: {possibleQuestions.length}{" "}
        </Text>
      </View>
      {selectedValue &&
        possibleQuestions.length >= quantity &&
        quantity > 0 && (
          <Button
            text={"Iniciar novo jogo"}
            handleClick={() => generateQuestions()}
            style={styles.button}
            textStyle={styles.buttonText}
          ></Button>
        )}
    </View>
  );
}

export default GameConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputQuestions: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#4B0082",
  },
  input: {
    height: 40,
    borderColor: "#4B0082",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4B0082",
    borderRadius: 10,
    padding: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
