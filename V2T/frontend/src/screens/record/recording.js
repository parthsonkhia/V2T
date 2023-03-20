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
	ScrollView,
	Image,
	Modal,
} from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Button from "../../components/button";

const Recording = () => {
	const [recording, setRecording] = useState();
	const [mostRecentRecording, setMostRecentRecording] = useState();
	const [currentTranscript, setCurrentTranscript] = useState("");
	const [previousRecordings, setPreviousRecordings] = useState([]);
	const [mic, setMic] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [showHistory, setShowHistory] = useState(false);
	const [showTranscript, setShowTranscript] = useState(-1);
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [gameName, setGameName] = useState("");
	const baseURL = "http://13.58.30.107";

	const startRecording = async () => {
		try {
			if (mostRecentRecording) {
				saveCurrentRecording();
			}
			setMic(true);
			setShowHistory(false);
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
		setMic(false);
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

	const handleDelete = (index) => {
		let updatedPreviousRecordings = previousRecordings.filter(
			(rcd, i) => i != index
		);
		console.log(updatedPreviousRecordings);
		setMostRecentRecording(undefined);
		setPreviousRecordings(updatedPreviousRecordings);
		setCurrentTranscript("");
		setIsEditable(false);
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
		//
		const params = new URLSearchParams({
			game: "BUF VS Opponent",
			counter_no: global.counter_no,
			transcript: currentTranscript,
		});
		axios({
			method: "post",
			url:
				"https://data.mongodb-api.com/app/data-ahunl/endpoint/add_transcript?" +
				params,
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleShowTranscript = (index) => {
		if (showTranscript == index) {
			setShowTranscript(-1);
		} else {
			setShowTranscript(index);
		}
	};

	const handleNewGame = () => {
		console.log("New Game created!");
	};

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			disabled={showHistory ? true : false}
		>
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
									<Feather name="play" size={24} color="green" />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => handleDelete(previousRecordings.length - 1)}
									style={styles.button}
								>
									<AntDesign name="delete" size={24} color="red" />
								</TouchableOpacity>
							</View>
						</View>
					) : previousRecordings.length > 0 && !mic ? (
						<View>
							<Button
								text={!showHistory ? "Show history" : "Hide History"}
								onButtonPress={() => {
									setShowHistory(!showHistory);
									setShowTranscript(-1);
								}}
								buttonStyle={styles.historyButton}
								textStyle={{ fontSize: 16, fontWeight: "500" }}
							/>
							{showHistory ? (
								<View style={styles.scrollViewContainer}>
									<ScrollView showsVerticalScrollIndicator={false}>
										{previousRecordings.map((recording, index) => {
											return (
												<View key={index}>
													<View
														style={[
															styles.recordingBoxContainer,
															{ borderBottomWidth: 0 },
														]}
													>
														<Text style={styles.recordingNameText}>
															Recording {index + 1} - {recording.duration}
														</Text>
														<View style={styles.recordingButtonContainer}>
															<TouchableOpacity
																onPress={() => recording.sound.replayAsync()}
																style={styles.button}
															>
																<Feather name="play" size={26} color="green" />
															</TouchableOpacity>
															<TouchableOpacity
																onPress={() => handleDelete(index)}
																style={styles.button}
															>
																<AntDesign
																	name="delete"
																	size={26}
																	color="red"
																/>
															</TouchableOpacity>
															<TouchableOpacity
																onPress={() => handleShowTranscript(index)}
																style={styles.button}
															>
																<MaterialIcons
																	name="translate"
																	size={26}
																	color="black"
																/>
															</TouchableOpacity>
														</View>
													</View>
													{showTranscript == index ? (
														<View style={styles.transcriptBoxStyle}>
															<Text style={styles.transcriptBoxText}>
																{recording.transcript}
															</Text>
														</View>
													) : null}
												</View>
											);
										})}
									</ScrollView>
								</View>
							) : null}
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
								activeOpacity={0.8}
								onPress={recording ? stopRecording : startRecording}
								style={
									recording
										? styles.recorderStopButton
										: styles.recorderStartButton
								}
							></TouchableOpacity>
						) : (
							<ActivityIndicator size="large" color="#ff5a5f" />
						)}
					</View>
				</View>
				{previousRecordings.length > 0 && !mic ? (
					<TouchableOpacity
						style={styles.newGameBox}
						activeOpacity={0.7}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.newGameText}> New Game </Text>
					</TouchableOpacity>
				) : (
					<View style={styles.newGameDummyBox} />
				)}
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>
									Enter the name of the new game you wish to create
								</Text>
								<TextInput
									style={styles.newGameName}
									onChangeText={setGameName}
									value={gameName}
									placeholder="Team 1 vs Team 2"
								/>
								<TouchableOpacity
									style={[styles.button, styles.buttonContinue]}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.textStyle}>Continue</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.textStyle}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	box: {
		width: 150,
		height: 150,
		backgroundColor: "#28b5b5",
		marginTop: 22,
		marginBottom: 22,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},
	recordingListBox: {
		width: "90%",
		height: "70%",
		marginTop: 10,
	},
	recorderBox: {
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		height: "15%",
	},
	recordingText: {
		fontWeight: "bold",
		fontSize: 17,
	},
	recorderStartButton: {
		height: 80,
		width: 80,
		borderRadius: 40,
		backgroundColor: "#ff5a5f",
	},
	recorderStopButton: {
		height: 55,
		width: 55,
		borderRadius: 10,
		backgroundColor: "#ff5a5f",
	},
	recorderOuterRing: {
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		width: 100,
		borderWidth: 3,
		borderRadius: 50,
	},
	recordingBoxContainer: {
		borderBottomWidth: 3,
		borderColor: "#6096ba",
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 70,
		marginBottom: 10,
	},
	recordingButtonContainer: {
		width: "35%",
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
	transcriptBoxStyle: {
		padding: 5,
		justifyContent: "center",
		borderBottomWidth: 2,
		borderColor: "#6096ba",
	},
	transcriptBoxText: {
		fontSize: 17,
		fontWeight: "500",
	},
	scrollViewContainer: {
		height: "95%",
	},
	historyButton: {
		alignSelf: "center",
		padding: 5,
		height: 45,
		width: "100%",
		borderRadius: 5,
		borderWidth: 0.5,
	},
	newGameBox: {
		height: 45,
		width: 180,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		backgroundColor: "#444",
	},
	newGameDummyBox: {
		height: 45,
		width: 180,
		marginBottom: 20,
	},
	newGameText: {
		fontWeight: "700",
		fontSize: 18,
		color: "white",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		borderRadius: 10,
		width: 100,
		height: 35,
		justifyContent: "center",
	},
	buttonContinue: {
		backgroundColor: "#2196F3",
	},
	buttonClose: {
		marginTop: 10,
		backgroundColor: "red",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	newGameName: {
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		minWidth: 250,
	},
});

export default Recording;