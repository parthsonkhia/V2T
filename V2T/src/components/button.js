import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity style={[styles.container, {marginTop: props.marginTop}]} onPress={props.onButtonPress}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: "center",
        width: "50%",
        height: 50,
        marginVertical: 10,
        borderRadius: 15
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
	},
})

export default Button