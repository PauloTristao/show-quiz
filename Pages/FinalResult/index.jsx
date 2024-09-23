import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import AnswerListGame from "../Components/AnswerListGame";
import { AnswerContext } from "../../context/AnswerContext";
import { QuestionContext } from "../../context/QuestionContext";

function FinalResult({ navigation }) {
  const [result, setResult] = useState(0);
  const { answers, answersGame, setAnswersGame } = useContext(AnswerContext);
  const { questions, questionsGame, setQuestionsGame } =
    useContext(QuestionContext);

  useEffect(() => {
    calculateScore();
  }, []);

  const calculateScore = () => {
    const correctAnswersCount = questionsGame.reduce((count, question) => {
      const correctAnswers = answers.filter(
        (answer) =>
          answer.questionId === question.questionId && answer.isCorrect === 1
      );

      const userAnswers = answersGame.filter(
        (answer) => answer.questionId === question.questionId
      );

      if (userAnswers.length === correctAnswers.length) {
        const allCorrect = correctAnswers.every((correctAnswer) =>
          userAnswers.some(
            (userAnswer) =>
              userAnswer.answerId === correctAnswer.answerId &&
              userAnswer.isCorrect === 1
          )
        );

        return count + (allCorrect ? 1 : 0);
      }

      return count;
    }, 0);

    setResult(correctAnswersCount);
  };

  return (
    <View style={styles.container}>
      <Text>FinalResult</Text>
      <Text>
        Você acertou {result} de {questionsGame.length} questões
      </Text>
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
