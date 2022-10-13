import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";

const Recording = (props) => {
	const handleDelete = (ind) => {
		props.setRecordings(props.recordings.filter((rcrd, i) => i != ind));
	};
	return (
		<View key={props.index} style={styles.container}>
			<Text style={styles.fill}>
				Recording {props.index + 1} - {props.recordingLine.duration}
			</Text>
			<TouchableOpacity
				onPress={() => handleDelete(props.index)}
				style={styles.button}
			>
				<Text>Del</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => props.recordingLine.sound.replayAsync()}
				style={styles.button}
			>
				<Text>Play</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => Sharing.shareAsync(props.recordingLine.file)}
				style={styles.button}
			>
				<Text>Share</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		height: 50,
		padding: 5,
		width: "100%",
	},
});

export default Recording;
