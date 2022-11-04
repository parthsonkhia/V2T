import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PlayerList from "./playerList";
import axios from "axios";

const Roster = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const baseURL = "https://data.mongodb-api.com/app/data-ahunl/endpoint";
	const arg1 = "DEF";

	useEffect(() => {
		axios({
			method: "get",
			url: baseURL + "/roster_details?arg1=" + arg1,
		})
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<View style={styles.container}>
			{!loading ? (
				<PlayerList data={data} />
			) : (
				<ActivityIndicator size="large" color="#6096ba" />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
});

export default Roster;
