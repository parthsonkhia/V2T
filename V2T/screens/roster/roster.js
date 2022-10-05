import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayerList from "./playerList";

const Roster = () => {
	const data = [
		{
			name: "Player 1",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 2",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 3",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 4",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 1",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 2",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 3",
			position: "QB",
			age: 21,
		},
		{
			name: "Player 4",
			position: "QB",
			age: 21,
		},
	];
	return (
		<View style={styles.container}>
			<PlayerList data={data}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
		backgroundColor: "#999999",
	},
});

export default Roster;
