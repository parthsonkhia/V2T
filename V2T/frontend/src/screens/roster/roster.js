import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TextInput, Text, TouchableOpacity } from "react-native";
import PlayerList from "./playerList";
import axios from "axios";

const Roster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [arg1, setArg1] = useState('DEF');

  const baseURL = "https://data.mongodb-api.com/app/data-ahunl/endpoint";

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/roster_details?arg1=${arg1}`,
    })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [arg1]);

  useEffect(() => {
    // Filter data based on searchText
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, arg1 === 'DEF' && styles.activeButton]}
          onPress={() => setArg1('DEF')}
        >
          <Text style={[styles.buttonText, arg1 === 'DEF' && styles.activeButtonText]}>
            DEF
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, arg1 === 'ATT' && styles.activeButton]}
          onPress={() => setArg1('ATT')}
        >
          <Text style={[styles.buttonText, arg1 === 'ATT' && styles.activeButtonText]}>
            ATT
          </Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search players..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>
      </View>
      {!loading ? (
        <PlayerList data={filteredData} />
      ) : (
        <ActivityIndicator size="large" color="#6096ba" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6096ba',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#6096ba',
    borderColor: '#6096ba',
  },
  buttonText: {
    color: '#6096ba',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#fff',
  },
  searchContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
  }
});

export default Roster;
