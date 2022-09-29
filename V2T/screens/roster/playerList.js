import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Profile from "../../components/profile";

export default function PlayerList(props) {
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
			<View style={styles.container}>
				{props.data.map((obj, i) => {
					return (
						<Profile
							key={i}
							name={obj.name}
							position={obj.position}
							age={obj.age}
						/>
					);
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
	},
    scrollViewStyle: {
        marginTop: 10
    }
});
