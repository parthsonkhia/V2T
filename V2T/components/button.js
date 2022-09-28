import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity style={[styles.container, {marginTop: props.marginTop}]}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
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

export default Button