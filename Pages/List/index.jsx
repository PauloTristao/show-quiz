import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../Components/Button";
import ListItem from "../Components/ListItem.jsx";
import { QuestionContext } from "../../context/QuestionContext";
import { ThemeContext } from "../../context/ThemeContext";
import * as themeService from "../../services/themeService";

function List({ navigation, route }) {
  const { data, screenName } = route.params;
  const { questions } = useContext(QuestionContext);
  const { themes, setThemes } = useContext(ThemeContext);

  function removeElement(id) {
    Alert.alert("Attention!", "Confirm removal?", [
      {
        text: "Sim",
        onPress: () => confirmRemove(id),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function confirmRemove(id) {
    try {
      if (screenName.toLowerCase() === "themes") {
        let themeId = id;
        await themeService.deleteTheme(themeId);
        setThemes((prevThemes) =>
          prevThemes.filter((theme) => theme.themeId !== themeId)
        );
        Alert.alert("Success!", "Successfully deleted.");
      }
    } catch (e) {
      Alert.alert(e.message || e.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{screenName}</Text>
      <Button
        text={`Register ${screenName}`}
        handleClick={() =>
          navigation.navigate("Form", {
            screenName: screenName,
            data: data,
          })
        }
        style={styles.button}
      ></Button>
      <ScrollView>
        {screenName.toLowerCase() === "themes" &&
          themes.map((theme) => (
            <ListItem
              key={theme.themeId}
              textValue={theme.description}
              handleEdit={() =>
                navigation.navigate("Form", {
                  screenName: screenName,
                  data: { id: theme.themeId, description: theme.description },
                })
              }
              handleDelete={() => removeElement(theme.themeId)}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
    marginBottom: 30,
  },
  button: {
    borderWidth: 2,
    marginBottom: 20,
    height: 50,
    width: "80%",
    borderRadius: 10,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
