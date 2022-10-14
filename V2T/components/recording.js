import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const Recording = (props) => {
	const baseURL = "http://18.218.107.255";
	const handleDelete = (ind) => {
		props.setRecordings(props.recordings.filter((rcrd, i) => i != ind));
	};
	const sendAudio = (recording) => {
		// FileSystem.readAsStringAsync(recording.file, {
		// 	encoding: FileSystem.EncodingType.Base64,
		// }).then((res) => {
		let formBody = new FormData();
		formBody.append("file", recording.file);
		axios({
			method: "post",
			url: baseURL + "/transcribe_file",
			data: formBody,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.error(err.response.data);
			});
		// });
	};
	return (
		<View key={props.index} style={styles.container}>
			<Text style={styles.fill}>
				Recording {props.index + 1} - {props.recordingLine.duration}
			</Text>
			<View style={styles.buttonContainer}>
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
					// onPress={() => Sharing.shareAsync(props.recordingLine.file)}
					onPress={() => sendAudio(props.recordingLine)}
					style={styles.button}
				>
					<Text>Share</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		height: 50,
		padding: 5,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	buttonContainer: {
		borderWidth: 1,
		width: "50%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default Recording;
