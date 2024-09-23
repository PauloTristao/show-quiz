import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AnswerContext } from "../../context/AnswerContext";

const AnswerList = ({ answersParam, questionId }) => {
  const [answersByQuestion, setAnswersByQuestion] = useState([]);
  const { answers, answersGame, setAnswersGame } = useContext(AnswerContext);

  useEffect(() => {
    if (answersParam) {
      setAnswersByQuestion(answersParam);
    }
  }, [answersParam]);

  const handleCheckboxPress = (answerId) => {
    setAnswersGame((prevAnswers) => {
      const answerToUpdate = answers.find(
        (answer) => answer.answerId === answerId
      );

      if (answerToUpdate) {
        const existingAnswer = prevAnswers.find(
          (answer) => answer.answerId === answerId
        );
        const updatedAnswer = existingAnswer
          ? {
              ...existingAnswer,
              isCorrect: existingAnswer.isCorrect === 1 ? 0 : 1,
            }
          : { ...answerToUpdate, isCorrect: 1 };
        if (updatedAnswer.isCorrect === 1) {
          return [...prevAnswers, updatedAnswer];
        } else {
          return prevAnswers.filter((answer) => answer.answerId !== answerId);
        }
      }

      return prevAnswers;
    });
  };

  const renderAnswers = () => {
    return answersByQuestion.map((answer) => (
      <View style={styles.line} key={answer.answerId}>
        <BouncyCheckbox
          fillColor="black"
          unFillColor="#FFFFFF"
          text="Custom Checkbox"
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => {
            handleCheckboxPress(answer.answerId);
          }}
        />
        <Text style={styles.itemForm}>{answer.description}</Text>
      </View>
    ));
  };

  return <View>{renderAnswers()}</View>;
};

export default AnswerList;

const styles = StyleSheet.create({
  itemForm: {
    height: 50,
    borderRadius: 15,
    borderColor: "#B8A8D9",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    width: "80%",
  },
  line: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
