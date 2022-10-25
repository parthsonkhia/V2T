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
						<Stack.Screen
							name="Sign Up"
							options={{
								headerStyle: { backgroundColor: "#6096ba" },
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "600",
									fontSize: 18,
								},
							}}
						>
							{(props) => <Register {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
						<Stack.Screen
							name="Login"
							options={{
								headerStyle: { backgroundColor: "#6096ba" },
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "600",
									fontSize: 18,
								},
							}}
						>
							{(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
					</Stack.Navigator>
				) : (
					<BottomTab loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
				)}
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
