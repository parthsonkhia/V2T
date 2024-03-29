import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Label = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.textStyle}>{props.text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		height: 30,
		marginTop: 15,
		alignSelf: "flex-start",
		marginLeft: "10%",
	},
	textStyle: {
		fontWeight: "600",
		fontSize: 16,
	},
});

export default Label;
