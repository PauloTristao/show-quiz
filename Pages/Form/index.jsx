import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import Button from "../Components/Button";
import * as themeService from "../../services/themeService";
import { QuestionContext } from "../../context/QuestionContext";
import { ThemeContext } from "../../context/ThemeContext";
import { AnswerContext } from "../../context/AnswerContext";

function Form({ navigation, route }) {
  const { data, screenName } = route.params;
  const { questions, setQuestions } = useContext(QuestionContext);
  const { themes, setThemes } = useContext(ThemeContext);
  const { answers, setAnswers } = useContext(AnswerContext);

  const [description, setDescription] = useState();

  useEffect(() => {
    setDescription(data?.description);
    if (screenName.toLowerCase() == "questions") {
    }
  }, []);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function saveData() {
    if (screenName.toLowerCase() == "questions") {
    } else if (screenName.toLowerCase() == "themes") {
      let newRegister = data?.id == undefined;
      let obj = {
        themeId: newRegister ? createUniqueId() : data?.id,
        description: description,
      };
      try {
        let response = false;
        if (newRegister) response = await themeService.addTheme(obj);
        else response = await themeService.updateTheme(obj);
        if (response) {
          Alert.alert("Success!", "Successfully saved.", [
            {
              text: "OK",
              onPress: () => navigation.goBack(), // Volta para a página anterior
            },
          ]);
          if (newRegister) {
            setThemes((prevThemes) => [...prevThemes, obj]);
          } else {
            setThemes((prevThemes) =>
              prevThemes.map((theme) =>
                theme.themeId === obj.themeId ? obj : theme
              )
            );
          }
        } else Alert.alert("Failed!");
        Keyboard.dismiss();
      } catch (e) {
        Alert.alert(e);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {`${data?.id ? "Add" : "Edit"} ${screenName
          .toLowerCase()
          .replace("s", "")}`}
      </Text>
      <TextInput
        onChangeText={(valor) => setDescription(valor)}
        style={styles.caixaTexto}
        value={description}
      />
      {screenName.toLowerCase() == "themes" && (
        <View>
          <Text>Themes</Text>
        </View>
      )}
      {screenName.toLowerCase() == "questions" && (
        <View>
          <Text>Questions</Text>
        </View>
      )}

      <Button
        text={"Save"}
        handleClick={() => saveData()}
        style={styles.button}
      ></Button>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
  },
  button: {
    borderWidth: 2,
    marginBottom: 10,
    height: 50,
    width: "80%",
    borderRadius: 10,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  caixaTexto: {
    width: "80%",
    height: 50,
    borderColor: "#0AF",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 30,
    paddingHorizontal: 10,
    fontSize: 24,
  },
});
