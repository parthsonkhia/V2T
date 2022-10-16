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
        height: 30,
        marginTop: 15,
        alignSelf: "flex-start",
        marginLeft: "10%",
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 17
	},
})

export default Label