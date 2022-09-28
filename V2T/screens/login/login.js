import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Box from "../../components/box";
import Button from "../../components/button";
import Label from "../../components/label";

const Login = () => {
	return (
        <View style={styles.container}>
            <Label text="Username"/>
		    <Box text=""/>
            <Label text="Password"/>
		    <Box text=""/>
		    <Button text="Log In" marginTop={80}/>
        </View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000",
        height: "100%",
		borderWidth: 5,
		borderColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
	},
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
	},
});

export default Login;
