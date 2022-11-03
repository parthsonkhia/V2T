import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	Platform,
	ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/button";
import Label from "../../components/label";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";

const Statistics = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [stat_data, setData] = useState([]);

	useEffect(() => {
		const baseURL =
			"http://3.142.243.46/report?play="+global.counter_no;
		axios({
			method: "get",
			url: baseURL,
		})
			.then((response) => {
				setData ([response.data]);
				setLoading(false);
				global.counter_no++;
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	if (!isLoading){
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>First Down Efficiency</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.first_down_efficiency}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Second Down Efficiency</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.second_down_efficiency.toFixed(2)}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Third Down Efficiency</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.third_down_efficiency}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Fourth Down Efficiency</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.fourth_down_efficiency}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Punts</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.n_punts}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Touchdowns</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.n_touchdowns}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Passing Yards</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.passing_yards}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Rushing Yards</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.rushing_yards}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total First Downs</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.total_first_down}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Second Downs</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.total_second_down}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Third Downs</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.total_third_down}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Fourth Downs</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.total_fourth_down}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Plays</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.total_plays}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Total Yards</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.total_yards}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View style={styles.label}>
					<Text style={styles.labelText}>Yards per Play</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.detailsText}>{stat_data[0].result.statistics.yards_per_play}</Text>
				</View>
			</View>
		</ScrollView>
		
	);
};
}

// const styles = StyleSheet.create({
// 	container: {
// 		backgroundColor: "#999999",
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		borderWidth: 1,
// 	},
	
// 	avatar: {
// 		position: "absolute",
// 		width: 150,
// 		height: 150,
// 		borderRadius: 75,
// 		backgroundColor: "rgba(52, 52, 52, 0.2)",
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	avatarPlaceholder: {
// 		marginVertical: 10,
// 		marginTop: 30,
// 		width: 160,
// 		height: 160,
// 		backgroundColor: "#E1E2E6",
// 		borderRadius: 80,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		alignSelf: "center",
// 		borderWidth: 0.5,
// 		borderColor: "silver",
// 	},
// 	container: {
// 		// borderWidth: 1,
// 	},
// 	textStyle: {
// 		textAlign: "center",
// 		fontSize: 20,
// 		fontWeight: "bold",
// 		color: "#fff",
// 	},
// 	textContainer: {
// 		height: 50,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "rgba(52, 52, 52, 0.2)",
// 		paddingHorizontal: 5,
// 	},
// });
const styles = StyleSheet.create({
	container: {
		borderWidth: 0,
		borderColor: "grey",
		width: "95%",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginBottom: 1,
		marginLeft: 10,
	},
	label: {
		borderWidth: 0,
		borderColor: "silver",
		fontWeight: 'bold',
		justifyContent: 'center',
		width: "50%",
		height: 50,
		margin: 10,
		paddingLeft: "10%",
	},
	value: {
		borderWidth: 0,
		width: "50%",
		height: 50,
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	detailsText: {
		fontSize: 13,
		fontWeight: "500",
	},
	labelText: {
		fontSize: 15,
		fontWeight: 'bold',
	}
});

export default Statistics;
