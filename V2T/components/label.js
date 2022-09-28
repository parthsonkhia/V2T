import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Label = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "light grey",
        height: 30,
        marginVertical: 10,
        alignSelf: "flex-start",
        marginLeft: "15%"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
	},
})

export default Label