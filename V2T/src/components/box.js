import React, { useState } from 'react';
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
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: "center",
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 5
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
	},
})

export default Box