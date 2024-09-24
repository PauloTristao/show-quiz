import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AnswerContext } from "../../context/AnswerContext";

const AnswerList = ({
  answersParam,
  questionId,
  correctAnswerId,
  isReviewMode,
}) => {
  const [answersByQuestion, setAnswersByQuestion] = useState([]);
  const { answers, answersGame, setAnswersGame } = useContext(AnswerContext);

  useEffect(() => {
    if (answersParam) {
      setAnswersByQuestion(answersParam);
    }
  }, [answersParam]);

  const handleCheckboxPress = (answerId) => {
    if (isReviewMode) return;
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

  const getCheckboxStyle = (answerId) => {
    if (isReviewMode) {
      const userAnswers = answersGame.filter(
        (answer) => answer.questionId === questionId
      );

      const hasCorrectAnswer = userAnswers.some(
        (answer) =>
          answer.answerId === correctAnswerId && answer.isCorrect === 1
      );

      if (!hasCorrectAnswer) {
        return { ...styles.wrongAnswer };
      }

      const isSelectedAnswer = userAnswers.find(
        (answer) => answer.answerId === answerId
      );

      if (answerId === correctAnswerId) {
        return { ...styles.correctAnswer };
      }

      if (isSelectedAnswer) {
        return { ...styles.wrongAnswer };
      }

      return {};
    }

    return {};
  };

  const renderAnswers = () => {
    return answersByQuestion.map((answer) => (
      <TouchableOpacity
        style={styles.line}
        key={answer.answerId}
        onPress={() => handleCheckboxPress(answer.answerId)}
      >
        <BouncyCheckbox
          fillColor="black"
          unFillColor="#FFFFFF"
          text="Custom Checkbox"
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => {
            handleCheckboxPress(answer.answerId);
          }}
          isChecked={answersGame.some(
            (selectedAnswer) => selectedAnswer.answerId === answer.answerId
          )}
          style={getCheckboxStyle(answer.answerId)}
        />
        <Text style={styles.itemForm}>{answer.description}</Text>
      </TouchableOpacity>
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
    paddingLeft: 5,

    fontSize: 15,
    width: "75%",
    color: "#4B0082",
    textAlignVertical: "center",
  },
  line: {
    width: "110%",
    flexDirection: "row",
    marginBottom: 10,
  },
  correctAnswer: {
    borderColor: "#28a745",
    backgroundColor: "#d4edda",
  },
  wrongAnswer: {
    borderColor: "#dc3545",
    backgroundColor: "#f8d7da",
  },
});
