import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import Button from "../Components/Button";
import * as themeService from "../../services/themeService";
import * as questionService from "../../services/questionService";
import * as answerService from "../../services/answerService";
import { QuestionContext } from "../../context/QuestionContext";
import { ThemeContext } from "../../context/ThemeContext";
import { AnswerContext } from "../../context/AnswerContext";
import AnswerList from "../Components/AnswerList";

function Form({ navigation, route }) {
  const { data, screenName } = route.params;
  const { questions, setQuestions } = useContext(QuestionContext);
  const { themes, setThemes } = useContext(ThemeContext);
  const { answers, setAnswers } = useContext(AnswerContext);

  const [description, setDescription] = useState();
  const [questionId, setQuestionId] = useState();
  const [newAnswers, setNewAnswers] = useState([]);

  useEffect(() => {
    setDescription(data?.description);
    if (screenName.toLowerCase() == "questions") {
      setQuestionId(data?.id);
    }
  }, []);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function saveData() {
    if (screenName.toLowerCase() == "questions") {
      let newRegister = data?.id == undefined;
      let obj = {
        questionId: newRegister ? createUniqueId() : data?.id,
        description: description,
        themeId: data?.themeId,
      };
      setQuestionId(obj.questionId);
      try {
        let response = false;
        if (newRegister) response = await questionService.addQuestion(obj);
        else response = await questionService.updateQuestion(obj);
        if (response) {
          if (newRegister) {
            setQuestions((prevQuestions) => [...prevQuestions, obj]);
            saveAnswers(obj.questionId);
          } else {
            setQuestions((prevQuestions) =>
              prevQuestions.map((question) =>
                question.questionId === obj.questionId ? obj : question
              )
            );
            saveAnswers(obj.questionId);
          }
        } else Alert.alert("Failed!");
        Keyboard.dismiss();
      } catch (e) {
        Alert.alert(e);
      }
    } else if (screenName.toLowerCase() == "themes") {
      let newRegister = data?.id == undefined;
      let obj = {
        themeId: newRegister ? createUniqueId() : data?.id,
        description: description,
      };
      try {
        let response = false;
        if (newRegister) response = await themeService.addTheme(obj);
        else response = await themeService.updateTheme(obj);
        if (response) {
          Alert.alert("Success!", "Successfully saved.", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
          if (newRegister) {
            setThemes((prevThemes) => [...prevThemes, obj]);
          } else {
            setThemes((prevThemes) =>
              prevThemes.map((theme) =>
                theme.themeId === obj.themeId ? obj : theme
              )
            );
          }
        } else Alert.alert("Failed!");
        Keyboard.dismiss();
      } catch (e) {
        Alert.alert(e);
      }
    }
  }

  async function saveAnswers(questionId) {
    try {
      let success = [];
      for (const answer of newAnswers) {
        let newRegister = !answers.find(
          (ans) => ans.answerId == answer.answerId
        );

        let obj = {
          answerId: answer.answerId,
          description: answer.description,
          isCorrect: answer.isCorrect,
          questionId: questionId,
        };
        let response = false;
        if (newRegister) {
          response = await answerService.addAnswer(obj);
        } else {
          response = await answerService.updateAnswer(obj);
        }
        if (response) {
          if (newRegister) {
            setAnswers((prevAnswers) => [...prevAnswers, obj]);
          } else {
            setAnswers((prevAnswers) =>
              prevAnswers.map((ans) =>
                ans.answerId === obj.answerId ? obj : ans
              )
            );
          }
          success.push(1);
        } else {
          success.push(0);
        }
      }
      if (success.some((value) => value === 0)) {
        Alert.alert("Failed!");
      } else {
        Alert.alert("Success!", "Successfully saved.", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while saving.");
      console.error(error);
    }
  }

  function returnAnswers() {
    return (
      <AnswerList
        answers={answers}
        newAnswers={newAnswers}
        setNewAnswers={setNewAnswers}
        questionId={questionId}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {`${data?.id ? "Edit" : "Add"} ${screenName
          .toLowerCase()
          .slice(0, -1)}`}
      </Text>

      {/* Card Branco para o conteúdo */}
      <View style={styles.card}>
        <TextInput
          onChangeText={(valor) => setDescription(valor)}
          style={styles.caixaTexto}
          value={description}
          multiline={true}
        />

        {screenName.toLowerCase() == "questions" && (
          <ScrollView>{returnAnswers()}</ScrollView>
        )}
      </View>

      <Button
        text={"Save"}
        handleClick={() => saveData()}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E0F2",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    color: "#4A4A4A",
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4B0082",
    borderWidth: 0,
    height: 50,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  caixaTexto: {
    fontSize: 18,
    height: 100,
    borderColor: "#4B0082",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    textAlignVertical: "top",
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
