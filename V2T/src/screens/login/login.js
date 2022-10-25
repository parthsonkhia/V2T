import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Button from "../../components/button";
import Label from "../../components/label";
import axios from "axios";

const Login = ({ navigation, route, setLoggedIn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);
	const actionLogin = () => {
		const baseURL =
			"https://data.mongodb-api.com/app/data-ahunl/endpoint/users";
		axios({
			method: "post",
			url: baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				// console.log(response.data);
				setLoggedIn(true);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const validation = () => {
		const emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		let valid = true;
		// email check
		if (email == "") {
			setValidEmail(false);
			valid = false;
		} else if (!emailregex.test(email)) {
			setValidEmail(false);
			valid = false;
		} else {
			setValidEmail(true);
		}
		// password check
		if (password == "" || password.length < 6) {
			setValidPassword(false);
			valid = false;
			setPassword("");
		} else {
			setValidPassword(true);
		}
		if (valid) {
			actionLogin();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Label text="Email" />
				<TextInput
					style={
						validEmail
							? styles.textBoxStyle
							: [styles.textBoxStyle, { borderColor: "red" }]
					}
					onChangeText={setEmail}
					value={email}
				/>
				<Label text="Password" />
				<TextInput
					secureTextEntry={true}
					style={
						validPassword
							? styles.textBoxStyle
							: [styles.textBoxStyle, { borderColor: "red" }]
					}
					onChangeText={setPassword}
					value={password}
				/>
				<Button
					text="GO"
					marginTop={80}
					onButtonPress={actionLogin}
					textStyle={{ color: "#FFF" }}
					buttonStyle={{
						backgroundColor: "#6096ba",
						borderWidth: 0,
						width: "60%",
					}}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	textStyle: {
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
	},
});

export default Login;
