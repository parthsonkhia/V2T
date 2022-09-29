import React from "react";
import { View, StyleSheet } from "react-native";
import Profile from "../../components/profile";

const Roster = () => {
	const data = [1, 2, 3, 4];
	return (
		<View style={styles.container}>
			<View>
				{data.map((i) => {
					return <Profile key={i} />;
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		borderWidth: 5,
		borderColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Roster;
