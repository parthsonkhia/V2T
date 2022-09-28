import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Box = (props) => {
    return (
        <View style={[styles.container, {marginTop: props.marginTop}]}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: "white",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "light grey",
        width: "70%",
        height: 70,
        marginVertical: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
	},
})

export default Box