import React, { useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	Alert,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Recording = () => {
	const [recording, setRecording] = useState();
	const [mostRecentRecording, setMostRecentRecording] = useState();
	const [currentTranscript, setCurrentTranscript] = useState("");
	const [previousRecordings, setPreviousRecordings] = useState([]);
	const [isEditable, setIsEditable] = useState(false);
	const [loading, setLoading] = useState(false);
	const baseURL = "http://3.139.78.213";

	const startRecording = async () => {
		try {
			setIsEditable(false);
			const permission = await Audio.requestPermissionsAsync();
			if (permission.status === "granted") {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: true,
					playsInSilentModeIOS: true,
				});
				const { recording } = await Audio.Recording.createAsync(
					Audio.RecordingOptionsPresets.HIGH_QUALITY
				);
				setRecording(recording);
			} else {
				Alert.alert("Please grant permission to app to access microphone");
			}
		} catch (err) {
			console.error("Failed to start recording", err);
		}
	};

	const getDurationFormatted = (millis) => {
		const minutes = millis / 1000 / 60;
		const minutesDisplay = Math.floor(minutes);
		const seconds = Math.round((minutes - minutesDisplay) * 60);
		const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutesDisplay}:${secondsDisplay}`;
	};

	const stopRecording = async () => {
		setRecording(undefined);
		setIsEditable(false);
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			playsInSilentModeIOS: true,
		});
		const { sound, status } = await recording.createNewLoadedSoundAsync();
		const newRecordingObject = {
			sound: sound,
			duration: getDurationFormatted(status.durationMillis),
			file: recording.getURI(),
			transcript: "",
		};
		sendRecording(newRecordingObject);
		setMostRecentRecording(newRecordingObject);
	};

	const sendRecording = (newRecordingObject) => {
		let formBody = new FormData();
		let uri = newRecordingObject.file;
		let uriParts = uri.split(".");
		let fileType = uriParts[uriParts.length - 1];
		formBody.append("file", {
			uri,
			name: `recording.${fileType}`,
			type: `audio/x-${fileType}`,
		});
		setLoading(true);
		axios({
			method: "post",
			url: baseURL + "/transcribe_file",
			data: formBody,
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {
				if (response.data.result.text.length > 0) {
					setCurrentTranscript(response.data.result.text);
					newRecordingObject.transcript = response.data.result.text;
					let updatedPreviousRecordings = [...previousRecordings];
					updatedPreviousRecordings.push(newRecordingObject);
					setPreviousRecordings(updatedPreviousRecordings);
					setLoading(false);
					setIsEditable(true);
				} else {
					setLoading(false);
					setCurrentTranscript(
						"Couldn't translate the audio, can you send it again?"
					);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleDelete = () => {
		let updatedPreviousRecordings = [...previousRecordings];
		updatedPreviousRecordings.pop();
		setRecordings(updatedPreviousRecordings);
		setMessage("Record a new audio");
		isEditable(false);
		setLoading(false);
	};

	const saveCurrentRecording = () => {
		let updatedPreviousRecordings = [...previousRecordings];
		let lastRecording = updatedPreviousRecordings.pop();
		lastRecording.transcript = currentTranscript;
		updatedPreviousRecordings.push(lastRecording);
		setPreviousRecordings(updatedPreviousRecordings);
		setMostRecentRecording(undefined);
		setCurrentTranscript("");
		setIsEditable(false);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.recordingListBox}>
					{mostRecentRecording ? (
						<View style={styles.recordingBoxContainer}>
							<Text style={styles.recordingNameText}>
								Recording - {mostRecentRecording.duration}
							</Text>
							<View style={styles.recordingButtonContainer}>
								<TouchableOpacity
									onPress={() => mostRecentRecording.sound.replayAsync()}
									style={styles.button}
								>
									<Feather name="play" size={24} color="black" />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => handleDelete()}
									style={styles.button}
								>
									<AntDesign name="delete" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>
					) : null}
					<View style={styles.translatedTextBox}>
						{!loading ? (
							<TextInput
								style={styles.translatedTextStyles}
								onChangeText={setCurrentTranscript}
								value={currentTranscript}
								multiline={true}
							/>
						) : null}
					</View>
					{isEditable ? (
						<TouchableOpacity
							style={styles.saveFinalButton}
							onPress={saveCurrentRecording}
						>
							<Text>Save</Text>
						</TouchableOpacity>
					) : null}
				</View>
				<View style={styles.recorderBox}>
					<View style={styles.recorderOuterRing}>
						{!loading ? (
							<TouchableOpacity
								onPress={recording ? stopRecording : startRecording}
								style={
									recording
										? styles.recorderStopButton
										: styles.recorderStartButton
								}
							></TouchableOpacity>
						) : (
							<ActivityIndicator size="large" color="#e63946" />
						)}
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},
	recordingListBox: {
		// borderWidth: 1,
		width: "90%",
		height: "75%",
		marginTop: 10,
	},
	recorderBox: {
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 25,
	},
	recordingText: {
		fontWeight: "bold",
		fontSize: 17,
	},
	recorderStartButton: {
		height: 60,
		width: 60,
		borderRadius: 40,
		backgroundColor: "#d90429",
	},
	recorderStopButton: {
		height: 40,
		width: 40,
		borderRadius: 10,
		backgroundColor: "#e63946",
	},
	recorderOuterRing: {
		alignItems: "center",
		justifyContent: "center",
		height: 70,
		width: 70,
		borderWidth: 3,
		borderRadius: 40,
	},
	recordingBoxContainer: {
		borderBottomWidth: 1,
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 70,
		marginBottom: 10,
	},
	recordingButtonContainer: {
		width: "30%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	recordingNameText: {
		fontWeight: "bold",
		fontSize: 17,
	},
	translatedTextBox: {
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	translatedTextStyles: {
		fontSize: 17,
		fontWeight: "500",
	},
	saveFinalButton: {
		borderWidth: 2,
		marginTop: "auto",
		width: "60%",
		height: 50,
		alignSelf: "center",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Recording;