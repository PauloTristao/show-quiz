import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AnswerListGame from "../Components/AnswerListGame";
import { AnswerContext } from "../../context/AnswerContext";
import { QuestionContext } from "../../context/QuestionContext";

function Game({ navigation, route }) {
  const { questionsId } = route.params;
  const { answers, answersGame, setAnswersGame } = useContext(AnswerContext);
  const { questions, questionsGame, setQuestionsGame } =
    useContext(QuestionContext);

  const [questionMoment, setQuestionMoment] = useState(null);
  const [questionOrder, setQuestionOrder] = useState(0);
  const [answersMoment, setAnswersMoment] = useState([]);

  useEffect(() => {
    console.log("Eai mano");
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
          title={"Next"}
          onPress={() => {
            handleNavigation();
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  caixaTexto: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
  questionArea: {
    flex: 0.5,
    width: "80%",
  },
});
