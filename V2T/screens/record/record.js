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
import Recording from "../../components/recording";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
// import Button from "../../components/button";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Record() {
	const [recording, setRecording] = useState();
	const [recordings, setRecordings] = useState([]);
	const [message, setMessage] = useState("Record your first audio");
	const [active, setActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [savedTranscript, setSavedTranscript] = useState(false);
	const baseURL = "http://3.139.78.213";
	const handleDelete = (ind) => {
		setRecordings(recordings.filter((rcrd, i) => i != ind));
		setMessage("Record your first audio");
		setActive(false);
		setLoading(false);
	};
	const sendAudio = (recording) => {
		// FileSystem.readAsStringAsync(recording.file, {
		// 	encoding: FileSystem.EncodingType.Base64,
		// }).then((res) => {
		let formBody = new FormData();
		let uri = recording.file;
		let uriParts = uri.split(".");
		let fileType = uriParts[uriParts.length - 1];
		formBody.append("file", {
			uri,
			name: `recording.${fileType}`,
			type: `audio/x-${fileType}`,
		});
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
				console.log(response.data.result.text);
			})
			.catch((err) => {
				console.error(err.response.data);
			});
		// });
	};

	async function startRecording() {
		try {
			setActive(false);
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
	}

	// async function stopRecording() {
	// 	setRecording(undefined);
	// 	await recording.stopAndUnloadAsync();

	// 	// let updatedRecordings = [...recordings];
	// 	let updatedRecordings = [];
	// 	const { sound, status } = await recording.createNewLoadedSoundAsync();
	// 	const newRecordingObject = {
	// 		sound: sound,
	// 		duration: getDurationFormatted(status.durationMillis),
	// 		file: recording.getURI(),
	// 	};

	// 	updatedRecordings.push(newRecordingObject);
	// 	setRecordings(updatedRecordings);
	// }

	async function stopAndSendRecording() {
		setRecording(undefined);
		setLoading(true);
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			playsInSilentModeIOS: true,
		});

		// let updatedRecordings = [...recordings];
		let updatedRecordings = [];
		const { sound, status } = await recording.createNewLoadedSoundAsync();
		const newRecordingObject = {
			sound: sound,
			duration: getDurationFormatted(status.durationMillis),
			file: recording.getURI(),
			transcript: "",
		};
		updatedRecordings.push(newRecordingObject);
		setRecordings(updatedRecordings);

		let formBody = new FormData();
		let uri = newRecordingObject.file;
		let uriParts = uri.split(".");
		let fileType = uriParts[uriParts.length - 1];
		formBody.append("file", {
			uri,
			name: `recording.${fileType}`,
			type: `audio/x-${fileType}`,
		});
		setActive(false);
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
					setMessage(response.data.result.text);
					console.log("here", recordings);
					setActive(true);
					setLoading(false);
				} else {
					setMessage("Couldn't translate the audio, can you send it again?");
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getDurationFormatted(millis) {
		const minutes = millis / 1000 / 60;
		const minutesDisplay = Math.floor(minutes);
		const seconds = Math.round((minutes - minutesDisplay) * 60);
		const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutesDisplay}:${secondsDisplay}`;
	}

	function getRecordingLines() {
		return recordings.map((recordingLine, index) => {
			return (
				<View key={index} style={styles.recordingBoxContainer}>
					<Text style={styles.fill}>
						Recording {index + 1} - {recordingLine.duration}
					</Text>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => handleDelete(index)}
							style={styles.button}
						>
							<Text>Del</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => recordingLine.sound.replayAsync()}
							style={styles.button}
						>
							<Text>Play</Text>
						</TouchableOpacity>
						<TouchableOpacity
							// onPress={() => Sharing.shareAsync(recordingLine.file)}
							onPress={() => sendAudio(recordingLine)}
							style={styles.button}
						>
							<Text>Share</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		});
	}

	const saveFinalText = () => {
		setSavedTranscript(true);
		setActive(false);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				{/* <View style={styles.recordingListBox}>{getRecordingLines()}</View> */}
				<View style={styles.recordingListBox}>
					{recordings.length > 0 ? (
						<View style={styles.recordingBoxContainer}>
							<Text style={styles.recordingNameText}>
								Recording - {recordings[recordings.length - 1].duration}
							</Text>
							<View style={styles.recordingButtonContainer}>
								<TouchableOpacity
									onPress={() =>
										recordings[recordings.length - 1].sound.replayAsync()
									}
									style={styles.button}
								>
									<Feather name="play" size={24} color="black" />
								</TouchableOpacity>
								{!loading ? (
									<TouchableOpacity
										onPress={() => handleDelete(0)}
										style={styles.button}
									>
										<AntDesign name="delete" size={24} color="black" />
									</TouchableOpacity>
								) : null}
								{savedTranscript ? (
									<TouchableOpacity
										onPress={() => handleDelete(0)}
										style={styles.button}
									>
										<MaterialIcons name="translate" size={24} color="black" />
									</TouchableOpacity>
								) : null}
								{/* <TouchableOpacity
								// onPress={() => Sharing.shareAsync(recordings[0].file)}
								onPress={() => sendAudio(recordings[0])}
								style={styles.button}
							>
								<Text>Share</Text>
							</TouchableOpacity> */}
							</View>
						</View>
					) : null}
					<View style={styles.translatedTextBox}>
						{!loading ? (
							<TextInput
								style={styles.translatedTextStyles}
								onChangeText={setMessage}
								value={message}
								multiline={true}
							/>
						) : null}
					</View>
					{active ? (
						<TouchableOpacity
							style={styles.saveFinalButton}
							onPress={saveFinalText}
						>
							<Text>Save</Text>
						</TouchableOpacity>
					) : null}
				</View>
				<View style={styles.recordingBox}>
					<View style={styles.recordingOuterButton}>
						{!loading ? (
							<TouchableOpacity
								onPress={recording ? stopAndSendRecording : startRecording}
								style={
									recording
										? styles.recordingStopButton
										: styles.recordingStartButton
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
}

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
	recordingBox: {
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 25,
	},
	recordingText: {
		fontWeight: "bold",
		fontSize: 17,
	},
	recordingStartButton: {
		height: 60,
		width: 60,
		borderRadius: 40,
		backgroundColor: "#d90429",
	},
	recordingStopButton: {
		height: 40,
		width: 40,
		borderRadius: 10,
		backgroundColor: "#e63946",
	},
	recordingOuterButton: {
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
