import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Roster from "./screens/roster/roster";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./navigators/bottomTab";

const Stack = createNativeStackNavigator();
export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				{!loggedIn ? (
					<Stack.Navigator>
						<Stack.Screen name="Register" component={Register} />
						<Stack.Screen name="Login">
							{(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
					</Stack.Navigator>
				) : (
					<BottomTab />
				)}
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
