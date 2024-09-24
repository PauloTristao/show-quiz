import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Button from "../Components/Button";
import * as themeService from "../../services/themeService";
import * as answerService from "../../services/answerService";
import * as questionService from "../../services/questionService";
import * as dbService from "../../services/dbService";

import { QuestionContext } from "../../context/QuestionContext";
import { ThemeContext } from "../../context/ThemeContext";
import { AnswerContext } from "../../context/AnswerContext";

function Home({ navigation }) {
  const { setQuestions } = useContext(QuestionContext);
  const { setThemes } = useContext(ThemeContext);
  const { setAnswers } = useContext(AnswerContext);

  useEffect(() => {
    createDatabase();
  }, []);

  async function createDatabase() {
    try {
      await dbService.createTables();
      await dbService.generateInitialData();
      loadData();
    } catch (e) {
      console.log(e);
    }
  }

  async function loadData() {
    try {
      let questions = await questionService.getAllQuestions();
      setQuestions(questions);
      let themes = await themeService.getAllThemes();
      setThemes(themes);
      let answers = await answerService.getAllAnswers();
      setAnswers(answers);
    } catch (e) {
      console.log(e.toString());
      Alert.alert(e.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SHOW QUIZ</Text>
      <View style={styles.card}>
        <View style={styles.buttonsArea}>
          <Button
            text={"Question Form"}
            handleClick={() =>
              navigation.navigate("List", { screenName: "Themes" })
            }
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <View style={{ marginTop: 20 }} />
          <Button
            text={"Play"}
            handleClick={() => navigation.navigate("GameConfig")}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5DFF1",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 50,
    color: "#4B0082",
    marginBottom: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  buttonsArea: {
    justifyContent: "center",
    width: "100%",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#4B0082",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
