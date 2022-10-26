import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	ActivityIndicator,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Button from "../../components/button";

const Profile = ({ navigation, loggedIn, setLoggedIn }) => {
	const [picture, setPicture] = useState("");
	const [loading, setLoading] = useState(true);
	const roles = ["Offense Coach", "Defense Coach", "Head Coach", "Other"];
	const [role, setRole] = useState("");
	const [showRoleDropdown, setShowRoleDropdown] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

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
				setName(response.data.Name);
				setEmail(response.data.Email);
				setPhone(response.data.Phone);
				setRole(response.data.Role);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleSignOut = () => {
		setLoggedIn(false);
	};

	return (
		<View style={styles.parentContainer}>
			{!loading ? (
				<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity
							style={styles.avatarPlaceholder}
							onPress={() => handlePress()}
						>
							{picture === "" ? (
								<Image
									source={require("../../../assets/profile.png")}
									style={{ height: 150, width: 150, borderRadius: 75 }}
								></Image>
							) : (
								<Image source={{ uri: picture }} style={styles.avatar} />
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.fieldNameStyle}>Name: </Text>
						<Text style={styles.userDataStyle}>{name}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.fieldNameStyle}>Email: </Text>
						<Text style={styles.userDataStyle}>{email}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.fieldNameStyle}>Phone: </Text>
						<Text style={styles.userDataStyle}>{phone}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.fieldNameStyle}>Role: </Text>
						<Text style={styles.userDataStyle}>{role} Coach</Text>
					</View>
					{/* <View>
				<TouchableOpacity>
					<Text>Edit Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setShowRoleDropdown(true)}>
					<Text>Change Role</Text>
				</TouchableOpacity>
				<SelectDropdown
					data={roles}
					rowTextForSelection={(item, index) => {
						return item;
					}}
					onSelect={(selectedItem, index) => {
						setRole(selectedItem);
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem;
					}}
					buttonStyle={styles.selectionButton}
					buttonTextStyle={styles.selectionButtonText}
					dropdownStyle={styles.selectionDropdown}
				/>
			</View> */}
					<View style={styles.signOutButton}>
						<Button
							text="Log Out"
							marginTop={10}
							onButtonPress={handleSignOut}
							textStyle={{ color: "#FFF" }}
							buttonStyle={{
								backgroundColor: "#6096ba",
								borderWidth: 0,
								marginTop: 50,
							}}
						/>
					</View>
				</View>
			) : (
				<ActivityIndicator size="large" color="#6096ba" />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
		backgroundColor: "#fff",
		flex: 1,
	},
	textContainer: {
		flexDirection: "row",
		marginVertical: 5,
		alignItems: "center",
		justifyContent: "space-between",
		height: 45,
	},
	textStyle: {
		width: "50%",
		fontSize: 17,
	},
	selectionButton: {
		height: 50,
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: "transparent",
	},
	selectionDropdown: {
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	fieldNameStyle: {
		width: "35%",
		fontWeight: "600",
		fontSize: 16,
		color: "gray",
		paddingVertical: 2,
		paddingLeft: 25,
	},
	userDataStyle: {
		width: "65%",
		fontWeight: "600",
		fontSize: 16,
		paddingRight: 25,
	},
	signOutButton: {
		justifyContent: "center",
		alignItems: "center",
	},
	parentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Profile;
