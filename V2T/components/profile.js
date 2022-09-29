import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./header";

const Profile = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.photo} />
			<View style={styles.rightBox}>
				<View style={styles.nameBox}>
					<Text style={styles.nameText}>{props.name}</Text>
				</View>
				<View style={styles.rightBottomBox}>
					<View style={[styles.details, { width: "100%" }]}>
						<Text style={styles.detailsText}>{props.position}</Text>
					</View>
					{/* <View style={[styles.details, {width: "30%"}]}>
						<Text style={styles.detailsText}>{props.age}</Text>
					</View> */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "grey",
		width: "95%",
		height: 100,
		flexDirection: "row",
		marginBottom: 10,
	},
	photo: {
		borderWidth: 1,
		borderColor: "silver",
		width: "25%",
		height: 80,
		margin: 10,
	},
	rightBox: {
		width: "60%",
		height: 80,
		margin: 10,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	nameBox: {
		width: "100%",
		height: 30,
		padding: 5,
	},
	rightBottomBox: {
		borderTopWidth: 1,
		borderColor: "silver",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: 40,
	},
	details: {
		height: 30,
		justifyContent: "center",
		alignItems: "flex-start",
		padding: 5,
	},
	nameText: {
		fontWeight: "600",
	},
	detailsText: {
		fontSize: 13,
		fontWeight: "500",
	},
});

export default Profile;
