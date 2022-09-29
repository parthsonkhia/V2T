import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = () => {
	return (
		<View style={styles.container}>
			<View style={styles.photo} />
			<View style={styles.rightBox}>
				<View style={styles.nameBox}>
					<Text></Text>
				</View>
				<View style={styles.rightBottomBox}>
					<View style={styles.details}>
						<Text></Text>
					</View>
					<View style={styles.details}>
						<Text></Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "grey",
		width: "70%",
		height: 80,
        flexDirection: "row"
	},
	photo: {
		borderWidth: 1,
		borderColor: "#000",
		width: "25%",
		height: 60,
		margin: 10,
	},
	rightBox: {
		// borderWidth: 1,
		// borderColor: "#000",
		width: "60%",
		height: 60,
		margin: 10,
        justifyContent: "space-evenly",
        alignItems: "center"
	},
	nameBox: {
		borderWidth: 1,
		borderColor: "#000",
		width: "80%",
		height: 20,
	},
	details: {
		borderWidth: 1,
		borderColor: "#000",
		width: 50,
		height: 20,
	},
	rightBottomBox: {
		// borderWidth: 1,
		// borderColor: "#000",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "80%",
        height: 20
	},
});

export default Profile;
