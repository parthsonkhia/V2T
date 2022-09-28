import React from "react";
import { View, StyleSheet } from "react-native";
import Box from "../../components/box";
import Button from "../../components/button";
import Label from "../../components/label";

const Register = () => {
	return (
		<View style={styles.container}>
			<Label text="Name" />
			<Box text="" />
			<Label text="Username" />
			<Box text="" />
			<Label text="Password" />
			<Box text="" />
			<Button text="Register" marginTop={80} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000",
		height: "100%",
		borderWidth: 5,
		borderColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
});

export default Register;
