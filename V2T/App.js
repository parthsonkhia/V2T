import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Roster from "./screens/roster/roster";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				{/* <Login /> */}
				{/* <Register /> */}
				<Roster />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
