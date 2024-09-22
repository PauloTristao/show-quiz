import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const AnswerList = ({ answers, questionId }) => {
  const [answersByQuestion, setAnswersByQuestion] = useState([]);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  useEffect(() => {
    if (answers) {
      setAnswersByQuestion(answers);
    }
  }, [answers]);

  // const handleCheckboxPress = (answerId) => {
  //   setNewAnswers((prevAnswers) =>
  //     prevAnswers.map((answer) =>
  //       answer.answerId === answerId
  //         ? { ...answer, isCorrect: answer.isCorrect === 1 ? 0 : 1 }
  //         : answer
  //     )
  //   );
  // };

  const renderAnswers = () => {
    return answersByQuestion.map((answer) => (
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
          editable={false}
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
    borderColor: "#dbd9d9",
    borderWidth: 2,
    backgroundColor: "#dbd9d9",
    width: "80%",
  },
  line: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
