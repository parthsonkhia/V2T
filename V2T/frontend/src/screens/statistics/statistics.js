import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import axios from "axios";

const Statistics = () => {
	const [loading, setLoading] = useState(true);
	const [stat_data, setData] = useState([]);

	useEffect(() => {
		console.log("here");
		const baseURL = "http://3.142.243.46/report?play=" + global.counter_no;
		axios({
			method: "get",
			url: baseURL,
		})
			.then((response) => {
				setData([response.data]);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<View style={styles.parentContainer}>
			{!loading ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>First Down Efficiency</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.first_down_efficiency}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Second Down Efficiency</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.second_down_efficiency.toFixed(
									2
								)}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Third Down Efficiency</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.third_down_efficiency}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Fourth Down Efficiency</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.fourth_down_efficiency}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Punts</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.n_punts}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Touchdowns</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.n_touchdowns}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Passing Yards</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.passing_yards}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Rushing Yards</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.rushing_yards}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total First Downs</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.total_first_down}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Second Downs</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.total_second_down}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Third Downs</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.total_third_down}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Fourth Downs</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.total_fourth_down}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Plays</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.total_plays}
							</Text>
						</View>
					</View>
					<View style={styles.container}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Total Yards</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.total_yards}
							</Text>
						</View>
					</View>
					<View style={[styles.container, { marginBottom: 10 }]}>
						<View style={styles.label}>
							<Text style={styles.labelText}>Yards per Play</Text>
						</View>
						<View style={styles.value}>
							<Text style={styles.detailsText}>
								{stat_data[0].result.statistics.yards_per_play}
							</Text>
						</View>
					</View>
				</ScrollView>
			) : (
				<ActivityIndicator size="large" color="#6096ba" />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: "row",
		marginTop: 5,
		backgroundColor: "#fff",
	},
	label: {
		justifyContent: "center",
		width: "62%",
		paddingLeft: 20,
	},
	value: {
		width: "38%",
		justifyContent: "center",
		alignItems: "center",
	},
	detailsText: {
		fontSize: 15,
		fontWeight: "600",
	},
	labelText: {
		fontSize: 15,
		fontWeight: "700",
	},
	parentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#6096ba",
	},
});

export default Statistics;
