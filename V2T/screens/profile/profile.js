import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/button";
import Label from "../../components/label";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";

const Profile = ({ navigation }) => {
	const [picture, setPicture] = useState("");

	const handlePress = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setPicture(result.uri);
		}
	};

	useEffect(() => {
		const baseURL =
			"https://data.mongodb-api.com/app/data-ahunl/endpoint/userInfo";
		axios({
			method: "get",
			url: baseURL,
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.avatarPlaceholder}
					onPress={() => handlePress()}
				>
					{picture === "" ? (
						<Image
							source={require("../../assets/profile.png")}
							style={{ height: 150, width: 150, borderRadius: 75 }}
						></Image>
					) : (
						<Image source={{ uri: picture }} style={styles.avatar} />
					)}
				</TouchableOpacity>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.textStyle}>Mihir Bhansali</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.textStyle}>mihirvin@buffalo.edu</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.textStyle}>716-907-8663</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.textStyle}>Defense Coach</Text>
			</View>
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
	avatar: {
		position: "absolute",
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: "rgba(52, 52, 52, 0.2)",
		justifyContent: "center",
		alignItems: "center",
	},
	avatarPlaceholder: {
		marginVertical: 10,
		marginTop: 30,
		width: 160,
		height: 160,
		backgroundColor: "#E1E2E6",
		borderRadius: 80,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		borderWidth: 0.5,
		borderColor: "silver",
	},
	container: {
		// borderWidth: 1,
	},
	textStyle: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
	},
	textContainer: {
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(52, 52, 52, 0.2)",
		paddingHorizontal: 5,
	},
});

export default Profile;
