import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/button";
import Label from "../../components/label";
import { CommonActions } from "@react-navigation/native";

const Login = ({ navigation, route }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const actionLogin = () => {
		route.params.setLoggedIn(true);
	};

	return (
		<View style={styles.container}>
			<Label text="Email" />
			<TextInput
				style={styles.textBoxStyle}
				onChangeText={setEmail}
				value={email}
			/>
			<Label text="Password" />
			<TextInput
				style={styles.textBoxStyle}
				onChangeText={setPassword}
				value={password}
			/>
			<Button text="Login" marginTop={80} onButtonPress={actionLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#999999",
		flex: 1,
		alignItems: "center",
		borderWidth: 1,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	textBoxStyle: {
		height: 50,
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	selectionButton: {
		height: 50,
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: "transparent",
	},
	selectionDropdown: {
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: "grey",
	},
});

export default Login;
