import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const AnswerList = ({ answers, questionId, newAnswers, setNewAnswers }) => {
  const [answersByQuestion, setAnswersByQuestion] = useState([]);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  useEffect(() => {
    if (answers) {
      const filteredAnswers = answers.filter(
        (answer) => answer.questionId === questionId
      );

      if (filteredAnswers.length > 0) {
        setNewAnswers(filteredAnswers);
      } else {
        const newAnswersArray = [];
        for (let i = 0; i < 4; i++) {
          let answer = {
            answerId: createUniqueId(),
            description: "",
            isCorrect: 0,
            questionId: questionId,
          };
          newAnswersArray.push(answer);
        }
        setNewAnswers(newAnswersArray);
      }
      setAnswersByQuestion(filteredAnswers);
    }
  }, [answers, questionId, setNewAnswers]);

  const handleDescriptionChange = (text, answerId) => {
    setNewAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.answerId === answerId ? { ...answer, description: text } : answer
      )
    );
  };

  const handleCheckboxPress = (answerId) => {
    setNewAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.answerId === answerId
          ? { ...answer, isCorrect: answer.isCorrect === 1 ? 0 : 1 }
          : answer
      )
    );
  };

  const renderAnswers = () => {
    return newAnswers.map((answer) => (
      <View style={styles.line} key={answer.answerId}>
        <BouncyCheckbox
          fillColor="black"
          unFillColor="#FFFFFF"
          text="Custom Checkbox"
          innerIconStyle={{ borderWidth: 2 }}
          isChecked={answer.isCorrect === 1}
          onPress={() => {
            handleCheckboxPress(answer.answerId);
          }}
        />
        <TextInput
          style={styles.itemForm}
          value={answer.description}
          onChangeText={(text) =>
            handleDescriptionChange(text, answer.answerId)
          }
        />
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
