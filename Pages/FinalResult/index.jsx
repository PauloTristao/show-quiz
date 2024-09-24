import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnswerContext } from "../../context/AnswerContext";
import { QuestionContext } from "../../context/QuestionContext";
import Button from "../Components/Button";

function FinalResult({ navigation }) {
  const [result, setResult] = useState(0);
  const { answers, answersGame } = useContext(AnswerContext);
  const { questionsGame } = useContext(QuestionContext);

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
      <View style={styles.resultCard}>
        <Text style={styles.title}>Resultado Final</Text>
        <Text style={styles.resultText}>
          Você acertou {result} de {questionsGame.length} questões
        </Text>
      </View>

      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        text="Revisar questões"
        handleClick={() => navigation.navigate("ReviewQuestions")}
      />
      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        text="Iniciar novo jogo"
        handleClick={() => navigation.navigate("GameConfig")}
      />
    </View>
  );
}

export default FinalResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE7F6",
    alignItems: "center",
    justifyContent: "center",
  },
  resultCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    marginTop: 20,
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
