import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Header(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "silver",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontWeight: "700",
        fontSize: 17,
        textAlign: "center"
    }
})