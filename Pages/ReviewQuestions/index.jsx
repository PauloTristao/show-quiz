import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AnswerContext } from "../../context/AnswerContext";
import { QuestionContext } from "../../context/QuestionContext";
import Button from "../Components/Button";

function ReviewQuestions({ navigation }) {
  const { questionsGame } = useContext(QuestionContext);
  const { answers, answersGame } = useContext(AnswerContext);

  const [questionOrder, setQuestionOrder] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswers, setCurrentAnswers] = useState([]);

  useEffect(() => {
    if (questionsGame.length > 0) {
      setCurrentQuestion(questionsGame[questionOrder]);
    }
  }, [questionsGame, questionOrder]);

  useEffect(() => {
    if (currentQuestion) {
      const filteredAnswers = answers.filter(
        (answer) => answer.questionId === currentQuestion.questionId
      );
      setCurrentAnswers(filteredAnswers);
    }
  }, [currentQuestion]);

  function handleNavigation() {
    setQuestionOrder((prevOrder) => {
      const newOrder = prevOrder + 1;
      return newOrder;
    });
  }

  useEffect(() => {
    if (questionOrder >= questionsGame.length) {
      navigation.navigate("FinalResult");
    }
  }, [questionOrder, navigation, questionsGame.length]);

  function renderAnswers() {
    return currentAnswers.map((answer) => {
      const userAnswer = answersGame.find(
        (a) => a.answerId === answer.answerId
      );
      const isCorrect = answer.isCorrect === 1;
      const isSelected = !!userAnswer;
      const borderColor = isSelected ? (isCorrect ? "green" : "red") : "#ccc";

      return (
        <View
          style={[styles.answerContainer, { borderColor }]}
          key={answer.answerId}
        >
          <Text style={styles.answerText}>{answer.description}</Text>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.caixaTexto}>{currentQuestion?.description}</Text>
      <ScrollView>{renderAnswers()}</ScrollView>
      <Button
        text="Next"
        handleClick={handleNavigation}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

export default ReviewQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  answerContainer: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "white",
  },
  answerText: {
    fontSize: 16,
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
  caixaTexto: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 60,
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    textAlignVertical: "top",
  },
});
