import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Pages/Home";
import FinalResult from "./Pages/FinalResult";
import GameConfig from "./Pages/GameConfig";
import Form from "./Pages/Form";
import List from "./Pages/List";
import Game from "./Pages/Game";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
          options={{ headerBackVisible: true, headerShown: true }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ headerBackVisible: false, headerShown: false }}
        />
        <Stack.Screen
          name="FinalResult"
          component={FinalResult}
          options={{ headerBackVisible: false, headerShown: true }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ headerBackVisible: true }}
          // animation: "slide_from_bottom"
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerBackVisible: false,
            headerBackTitleVisible: false,
          }}
          // title: "Esta é tela 3",
          // animation: "fade",
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
