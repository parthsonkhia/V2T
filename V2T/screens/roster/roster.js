import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayerList from "./playerList";
import axios from "axios";


const Roster = () => {
	const baseURL = "https://data.mongodb-api.com/app/data-ahunl/endpoint";
	const [data, setData] = useState([]);
	const arg1 = "DEF";
	axios({
		method: "get",
		url: baseURL + "/roster_details?arg1="+arg1,
		// headers: {
		// 	Accept: "application/json",
		// },
	})
		.then((response) => {
			setData([...response.data]);
		})
		.catch((err) => {
			console.error(err.response.data);
		});
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
