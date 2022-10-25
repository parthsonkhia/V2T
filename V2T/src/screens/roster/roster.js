import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import PlayerList from "./playerList";
import axios from "axios";

const Roster = () => {
	const [data, setData] = useState([]);

	const baseURL = "https://data.mongodb-api.com/app/data-ahunl/endpoint";
	const arg1 = "DEF";

	useEffect(() => {
		axios({
			method: "get",
			url: baseURL + "/roster_details?arg1=" + arg1,
		})
			.then((response) => {
				console.log(1);
				setData(response.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<View style={styles.container}>
			<PlayerList data={data} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		backgroundColor: "#fff",
	},
});

export default Roster;
