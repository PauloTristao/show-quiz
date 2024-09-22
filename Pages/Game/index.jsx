import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AnswerList from "../Components/AnswerList";
import { AnswerContext } from "../../context/AnswerContext";
import { QuestionContext } from "../../context/QuestionContext";

function Game({ navigation, route }) {
  const { questionsId } = route.params;
  const { answers } = useContext(AnswerContext);
  const { questions, setQuestionsGame } = useContext(QuestionContext);

  const [questionMoment, setQuestionMoment] = useState(null);
  const [answersMoment, setAnswersMoment] = useState([]);

  useEffect(() => {
    const filteredQuestions = questions.filter((question) =>
      questionsId.includes(question.questionId)
    );
    console.log("@@ opa 1", filteredQuestions);
    setQuestionsGame(filteredQuestions);

    if (filteredQuestions.length > 0) {
      setQuestionMoment(filteredQuestions[filteredQuestions.length - 1]);
    }
  }, [questionsId, questions]);

  useEffect(() => {
    console.log("@@ opa 2", questionMoment);
    if (questionMoment) {
      const filteredAnswers = answers.filter(
        (answer) => answer.questionId === questionMoment.questionId
      );
      setAnswersMoment(filteredAnswers);
    }

    console.log("@@ opa 3", answersMoment);
  }, [questionMoment]);

  function returnAnswers() {
    return <AnswerList answers={answersMoment} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        style={styles.caixaTexto}
        value={questionMoment.description}
      />
      {/* <ScrollView>{returnAnswers()}</ScrollView> */}
      <Button
        title={"Next"}
        onPress={() => {
          return;
        }}
        style={styles.button}
      />
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
    width: "80%",
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
});
