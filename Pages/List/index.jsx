import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../Components/Button";
import ListItem from "../Components/ListItem.jsx";
import { QuestionContext } from "../../context/QuestionContext";
import { ThemeContext } from "../../context/ThemeContext";
import * as themeService from "../../services/themeService";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import { AnswerContext } from "../../context/AnswerContext.js";

function List({ navigation, route }) {
  const { data, screenName } = route.params;
  const { questions, setQuestions } = useContext(QuestionContext);
  const { answers, setAnswers } = useContext(AnswerContext);
  const { themes, setThemes } = useContext(ThemeContext);

  function removeElement(id) {
    Alert.alert("Attention!", "Confirm removal?", [
      {
        text: "Sim",
        onPress: () => confirmRemove(id),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function confirmRemove(id) {
    try {
      if (screenName.toLowerCase() === "themes") {
        let themeId = id;
        await themeService.deleteTheme(themeId);
        setThemes((prevThemes) =>
          prevThemes.filter((theme) => theme.themeId !== themeId)
        );
        Alert.alert("Success!", "Successfully deleted.");
      } else if (screenName.toLowerCase() === "questions") {
        let questionId = id;
        const answersToDelete = answers.filter(
          (answer) => answer.questionId === questionId
        );
        await answerService.deleteAnswers(answersToDelete);
        setAnswers((prevAnswers) =>
          prevAnswers.filter(
            (answerItem) =>
              !answersToDelete.some(
                (answer) => answer.answerId === answerItem.answerId
              )
          )
        );

        await questionService.deleteQuestion(questionId);
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.questionId !== questionId)
        );
        Alert.alert("Success!", "Successfully deleted.");
      }
    } catch (e) {
      Alert.alert(e.message || e.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{screenName}</Text>
      <Button
        text={`Register ${screenName}`}
        handleClick={() =>
          navigation.navigate("Form", {
            screenName: screenName,
            data:
              screenName.toLowerCase() === "themes"
                ? data
                : {
                    id: undefined,
                    description: undefined,
                    themeId: data?.id,
                  },
          })
        }
        style={styles.button}
      ></Button>
      <ScrollView>
        {screenName.toLowerCase() === "themes" &&
          themes.map((theme) => (
            <ListItem
              key={theme.themeId}
              textValue={theme.description}
              handleEdit={() =>
                navigation.navigate("Form", {
                  screenName: screenName,
                  data: { id: theme.themeId, description: theme.description },
                })
              }
              handleDelete={() => removeElement(theme.themeId)}
              handleLongPress={() =>
                navigation.navigate("List", {
                  screenName: "Questions",
                  data: { id: theme.themeId, description: theme.description },
                })
              }
            />
          ))}
        {screenName.toLowerCase() === "questions" &&
          questions
            .filter((question) => question.themeId === data?.id)
            ?.map((question) => (
              <ListItem
                key={question.questionId}
                textValue={question.description}
                handleEdit={() =>
                  navigation.navigate("Form", {
                    screenName: screenName,
                    data: {
                      id: question.questionId,
                      description: question.description,
                      themeId: question.themeId,
                    },
                  })
                }
                handleDelete={() => removeElement(question.questionId)}
                handleLongPress={() => {
                  return;
                }}
              />
            ))}
      </ScrollView>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
    marginBottom: 30,
  },
  button: {
    borderWidth: 2,
    marginBottom: 20,
    height: 50,
    width: "80%",
    borderRadius: 10,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
