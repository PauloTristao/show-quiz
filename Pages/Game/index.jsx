import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AnswerListGame from "../Components/AnswerListGame";
import { AnswerContext } from "../../context/AnswerContext";
import { QuestionContext } from "../../context/QuestionContext";
import Button from "../Components/Button";

function Game({ navigation, route }) {
  const { questionsId } = route.params;
  const { answers, answersGame, setAnswersGame } = useContext(AnswerContext);
  const { questions, questionsGame, setQuestionsGame } =
    useContext(QuestionContext);

  const [questionMoment, setQuestionMoment] = useState(null);
  const [questionOrder, setQuestionOrder] = useState(0);
  const [answersMoment, setAnswersMoment] = useState([]);

  useEffect(() => {
    const questionIdsArray = questionsId.map((id) => id.value);
    const filteredQuestions = questions.filter((question) =>
      questionIdsArray.includes(question.questionId)
    );
    setQuestionsGame(filteredQuestions);

    if (filteredQuestions.length > 0) {
      setQuestionMoment(filteredQuestions[questionOrder]);
    }
  }, [questionsId, questions]);

  useEffect(() => {
    if (questionMoment) {
      const filteredAnswers = answers.filter(
        (answer) => answer.questionId === questionMoment.questionId
      );
      setAnswersMoment(filteredAnswers);
    }
  }, [questionMoment]);

  function returnAnswers() {
    return <AnswerListGame answersParam={answersMoment} />;
  }

  function handleNavigation() {
    setQuestionOrder((prevOrder) => {
      const newOrder = prevOrder + 1;

      if (newOrder >= questionsGame.length) {
        navigation.navigate("FinalResult");
      } else {
        setQuestionMoment(questionsGame[newOrder]);
      }

      return newOrder;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionArea}>
        <Text style={styles.caixaTexto}>{questionMoment?.description}</Text>
        <ScrollView>{returnAnswers()}</ScrollView>
        <Button
          text={"Next"}
          handleClick={handleNavigation}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    justifyContent: "center",
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
  questionArea: {
    flex: 0.7,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
