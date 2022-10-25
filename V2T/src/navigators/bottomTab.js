import React from "react";
import { Text, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import RosterStack from "./rosterStack";
import ProfileStack from "./profileStack";
import RecordStack from "./recordStack";
import StatStack from "./statStack";

const Tab = createBottomTabNavigator();

export default function BottomTab(props) {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#6096ba",
					height: Platform.OS === "ios" ? 90 : 65,
				},
				headerShown: false,
			}}
		>
			<Tab.Screen
				name="Record tab"
				component={RecordStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "#14213d",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Record
							</Text>
						) : (
							<Text style={{ fontSize: 12, color: "white", paddingBottom: 5 }}>
								Record
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Feather
								name="mic"
								size={23}
								color="#14213d"
								style={{ paddingTop: 5 }}
							/>
						) : (
							<Feather
								name="mic"
								size={20}
								color="white"
								style={{ paddingTop: 5 }}
							/>
						),
				}}
			/>
			<Tab.Screen
				name="Statistics tab"
				component={StatStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "#14213d",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Stats
							</Text>
						) : (
							<Text style={{ fontSize: 12, color: "white", paddingBottom: 5 }}>
								Stats
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Feather name="users" size={23} color="#14213d" />
						) : (
							<Feather name="users" size={20} color="white" />
						),
				}}
			/>
			<Tab.Screen
				name="Roster tab"
				component={RosterStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "#14213d",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Roster
							</Text>
						) : (
							<Text style={{ fontSize: 12, color: "white", paddingBottom: 5 }}>
								Roster
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Feather name="users" size={23} color="#14213d" />
						) : (
							<Feather name="users" size={20} color="white" />
						),
				}}
			/>
			<Tab.Screen
				name="Profile tab"
				children={() => (
					<ProfileStack
						loggedIn={props.loggedIn}
						setLoggedIn={props.setLoggedIn}
					/>
				)}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "#14213d",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Profile
							</Text>
						) : (
							<Text style={{ fontSize: 12, color: "white", paddingBottom: 5 }}>
								Profile
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<AntDesign
								name="user"
								size={23}
								color="#14213d"
								style={{ paddingTop: 5 }}
							/>
						) : (
							<AntDesign
								name="user"
								size={20}
								color="white"
								style={{ paddingTop: 5 }}
							/>
						),
				}}
			/>
		</Tab.Navigator>
	);
}
