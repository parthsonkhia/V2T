import React, { useState } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "./src/navigators/bottomTab";
import Login from "./src/screens/login/login";
import Register from "./src/screens/register/register";

const Stack = createNativeStackNavigator();
export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				{!loggedIn ? (
					<Stack.Navigator>
						<Stack.Screen name="Register">
							{(props) => <Register {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
						<Stack.Screen name="Login">
							{(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
					</Stack.Navigator>
				) : (
					<BottomTab loggedIn={loggedIn} />
				)}
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
