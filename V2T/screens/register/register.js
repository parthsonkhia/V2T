import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/button";
import Label from "../../components/label";

const Register = ({ navigation }) => {
	const roles = ["Offense Coach", "Defense Coach", "Head Coach", "Other"];
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
	const [validName, setValidName] = useState(true);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);
	const [validPhone, setValidPhone] = useState(true);
	const actionSkip = () => {
		navigation.navigate("Login");
	};

	const validation = () => {
		const emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		const alph = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
		let valid = true;
		// name check
		if (name == "") {
			valid = false;
			setValidName(false);
		} else if (!alph.test(name)) {
			valid = false;
			setValidName(false);
		} else {
			valid = true;
			setValidName(true);
		}
		// email check
		if (email == "") {
			valid = false;
			setValidEmail(false);
		} else if (!emailregex.test(email)) {
			valid = false;
			setValidEmail(false);
		} else {
			valid = true;
			setValidEmail(true);
		}
		// password check
		if (password == "" || password.length < 6) {
			valid = false;
			setValidPassword(false);
			setPassword("");
		} else {
			valid = true;
			setValidPassword(true);
		}
		// phone number check
		if (phone == "" || phone.length !== 10 || phone.charAt(0) < 7) {
			valid = false;
			setValidPhone(false);
		} else {
			valid = true;
			setValidPhone(true);
		}
		if (valid) {
			actionSkip();
		}
	};
	return (
		<View style={styles.container}>
			<Label text="Name" />
			<TextInput
				style={
					validName
						? styles.textBoxStyle
						: [styles.textBoxStyle, { borderColor: "red" }]
				}
				onChangeText={setName}
				value={name}
			/>
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
			<Label text="Phone" />
			<TextInput
				style={
					validPhone
						? styles.textBoxStyle
						: [styles.textBoxStyle, { borderColor: "red" }]
				}
				onChangeText={setPhone}
				value={phone}
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
			<Label text="Roles" />
			<SelectDropdown
				data={roles}
				rowTextForSelection={(item, index) => {
					return item;
				}}
				onSelect={(selectedItem, index) => {
					setRole(selectedItem);
				}}
				buttonTextAfterSelection={(selectedItem, index) => {
					return selectedItem;
				}}
				buttonStyle={styles.selectionButton}
				buttonTextStyle={styles.selectionButtonText}
				dropdownStyle={styles.selectionDropdown}
			/>
			<Button text="Register" marginTop={80} onButtonPress={validation} />
			<Button text="Skip" marginTop={10} onButtonPress={actionSkip} />
		</View>
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

export default Register;
