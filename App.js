import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import Home from "./Pages/Home";
import FinalResult from "./Pages/FinalResult";
import GameConfig from "./Pages/GameConfig";
import Form from "./Pages/Form";
import List from "./Pages/List";
import Game from "./Pages/Game";
import ReviewQuestions from "./Pages/ReviewQuestions";
import { QuestionProvider } from "./context/QuestionContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AnswerProvider } from "./context/AnswerContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <QuestionProvider>
        <AnswerProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerBackVisible: false, headerShown: false }}
              />
              <Stack.Screen
                name="GameConfig"
                component={GameConfig}
                options={{
                  headerBackVisible: true,
                  headerShown: true,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Game"
                component={Game}
                options={{ headerBackVisible: false, headerShown: false }}
              />
              <Stack.Screen
                name="FinalResult"
                component={FinalResult}
                options={{ headerBackVisible: false, headerShown: false }}
              />
              <Stack.Screen
                name="ReviewQuestions"
                component={ReviewQuestions}
                options={{ headerBackVisible: true, headerShown: false }}
              />
              <Stack.Screen
                name="List"
                component={List}
                options={{
                  headerBackVisible: true,
                  headerBackTitleVisible: false,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Form"
                component={Form}
                options={{ headerBackVisible: true, headerTitle: "" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AnswerProvider>
      </QuestionProvider>
    </ThemeProvider>
  );
}
