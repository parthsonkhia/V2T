import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { Audio } from "expo-av";
import Recording from "../../components/recording";

export default function Record() {
	const [recording, setRecording] = React.useState();
	const [recordings, setRecordings] = React.useState([]);

	async function startRecording() {
		try {
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

	async function stopRecording() {
		setRecording(undefined);
		await recording.stopAndUnloadAsync();

		let updatedRecordings = [...recordings];
		const { sound, status } = await recording.createNewLoadedSoundAsync();
		const newRecordingObject = {
			sound: sound,
			duration: getDurationFormatted(status.durationMillis),
			file: recording.getURI(),
		};

		

		updatedRecordings.push(newRecordingObject);
		setRecordings(updatedRecordings);
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
				<Recording
					index={index}
					recordingLine={recordingLine}
					recordings={recordings}
					setRecordings={setRecordings}
				/>
			);
		});
	}

	return (
		<View style={styles.container}>
			<View style={styles.recordingListBox}>{getRecordingLines()}</View>
			<View style={styles.recordingBox}>
				<View style={styles.recordingOuterButton}>
					<TouchableOpacity
						onPress={recording ? stopRecording : startRecording}
						style={
							recording
								? styles.recordingStopButton
								: styles.recordingStartButton
						}
					></TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	fill: {
		flex: 1,
		margin: 16,
	},
	button: {
		margin: 16,
	},
	recordingListBox: {
		borderWidth: 1,
		width: "90%",
		height: "75%",
		marginTop: 10,
	},
	recordingBox: {
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
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
});
