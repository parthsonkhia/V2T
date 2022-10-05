import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from 'react-native-select-dropdown';
import Button from "../../components/button";
import Label from "../../components/label";

const Register = ({ navigation }) => {
	const roles = ["Offense Coach", "Defense Coach", "Head Coach", "Other"]
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
	const actionSkip = () => {
		navigation.navigate("Login");
	}

	return (
		<View style={styles.container}>
			<Label text="Name" />
			<TextInput 
				style={styles.textBoxStyle}
				onChangeText={setName}
				value={name}
			/>
			<Label text="Email" />
			<TextInput 
				style={styles.textBoxStyle}
				onChangeText={setEmail}
				value={email}
			/>
			<Label text="Phone" />
			<TextInput 
				style={styles.textBoxStyle}
				onChangeText={setPhone}
				value={phone}
			/>
			<Label text="Password" />
			<TextInput 
				style={styles.textBoxStyle}
				onChangeText={setPassword}
				value={password}
			/>
			<Label text="Roles" />
			<SelectDropdown 
				data={roles}
				rowTextForSelection={(item, index) => {
					return item
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
				selectedRowStyle={{backgroundColor:"#000"}}
				selectedRowTextStyle={{color:"#fff"}}
			/>
			<Button text="Register" marginTop={80} />
			<Button text="Skip" marginTop={10} onButtonPress={actionSkip}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#999999",
		flex: 1,
		alignItems: "center",
		borderWidth: 1
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
		paddingHorizontal: 10
	},
	selectionButton: {
		height: 50,
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: 'transparent',
	},
	selectionDropdown: {
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: 'grey',
	}
});

export default Register;
