import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/button";
import Label from "../../components/label";
import { CommonActions } from "@react-navigation/native";
// import Voice from '@react-native-voice/voice';

const Record = ({ navigation }) => {
	const [started, setStarted] = useState(false);
	const startRecording = () => {};
	const stopRecording = () => {};
	return (
		<View style={styles.container}>
			{!started ? (
				<Button text="Start Recording" onButtonPress={startRecording} />
			) : (
				<Button text="Stop Recording" onButtonPress={stopRecording} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#999999",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
});

export default Record;
