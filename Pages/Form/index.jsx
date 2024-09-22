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
  // const [answersValues, setAnswersValues] = useState(new Array(4).fill({}));

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
              onPress: () => navigation.goBack(), // Volta para a página anterior
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
      <TextInput
        onChangeText={(valor) => setDescription(valor)}
        style={styles.caixaTexto}
        value={description}
      />
      {screenName.toLowerCase() == "themes" && (
        <View>
          <Text>Themes</Text>
        </View>
      )}
      {screenName.toLowerCase() == "questions" && (
        <ScrollView>{returnAnswers()}</ScrollView>
      )}

      <Button
        text={"Save"}
        handleClick={() => saveData()}
        style={styles.button}
      ></Button>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
  },
  button: {
    borderWidth: 2,
    marginBottom: 10,
    height: 50,
    width: "80%",
    borderRadius: 10,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  caixaTexto: {
    width: "80%",
    height: 50,
    borderColor: "#0AF",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 30,
    paddingHorizontal: 10,
    fontSize: 24,
  },
});
