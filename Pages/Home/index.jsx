import React, { useEffect, useState, useContext } from "react";
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
  const { questions, setQuestions } = useContext(QuestionContext);
  const { themes, setThemes } = useContext(ThemeContext);
  const { answers, setAnswers } = useContext(AnswerContext);

  useEffect(() => {
    createDatabase();
  }, []);

  async function createDatabase() {
    try {
      await dbService.createTables();
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
      <View style={styles.buttonsArea}>
        <Button
          text={"Question Form"}
          handleClick={() =>
            navigation.navigate("List", { screenName: "Themes" })
          }
          style={styles.button}
        ></Button>
        <View style={{ marginTop: 10 }}></View>
        <Button
          text={"Play"}
          handleClick={() => navigation.navigate("GameConfig")}
          style={styles.button}
        ></Button>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // backgroundColor: "#fab",
  },
  titulo: {
    fontSize: 50,
    marginTop: 100,
    // backgroundColor: "#fae",
  },
  buttonsArea: {
    // flex: 1,
    marginTop: 190,
    // alignItems: "center",
    // backgroundColor: "#bae",
    justifyContent: "center",
    width: "90%",
  },
  button: {
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
