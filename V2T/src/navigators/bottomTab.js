import React from "react";
import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Recording from "../screens/record/recording";
import Roster from "../screens/roster/roster";
import Profile from "../screens/profile/profile";

const Tab = createBottomTabNavigator();

export default function BottomTab(props) {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Recording"
				component={Recording}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "black",
									fontSize: 12,
									paddingBottom: 5,
								}}
							>
								Recording
							</Text>
						) : (
							<Text
								style={{ fontSize: 10, color: "#6c757d", paddingBottom: 5 }}
							>
								Recording
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Feather
								name="mic"
								size={22}
								color="black"
								style={{ paddingTop: 5 }}
							/>
						) : (
							<Feather
								name="mic"
								size={20}
								color="#6c757d"
								style={{ paddingTop: 5 }}
							/>
						),
				}}
			/>
			<Tab.Screen
				name="Roster"
				component={Roster}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "600",
									color: "black",
									fontSize: 12,
									paddingBottom: 5,
								}}
							>
								Roster
							</Text>
						) : (
							<Text
								style={{ fontSize: 10, color: "#6c757d", paddingBottom: 5 }}
							>
								Roster
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Feather name="users" size={22} color="black" />
						) : (
							<Feather name="users" size={20} color="#6c757d" />
						),
				}}
			/>
			<Tab.Screen
				name="Profile"
				children={() => <Profile loggedIn={props.loggedIn} />}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "600",
									color: "black",
									fontSize: 12,
									paddingBottom: 5,
								}}
							>
								Profile
							</Text>
						) : (
							<Text
								style={{ fontSize: 10, color: "#6c757d", paddingBottom: 5 }}
							>
								Profile
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<AntDesign
								name="user"
								size={22}
								color="black"
								style={{ paddingTop: 5 }}
							/>
						) : (
							<AntDesign
								name="user"
								size={20}
								color="#6c757d"
								style={{ paddingTop: 5 }}
							/>
						),
				}}
			/>
		</Tab.Navigator>
	);
}
