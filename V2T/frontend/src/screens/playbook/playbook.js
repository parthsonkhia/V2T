import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Your data and columns definitions here
const column = {
    // Your column data
    "data": {
      "Play Numner": {
        "0": 1,
        "1": 2,
        "2": 3,
        "3": 4,
        "4": 5,
        "5": 6,
        "6": 7,
        "7": 8,
        "8": 9,
        "9": 10
      },
      "ODK": {
        "0": "O",
        "1": "O",
        "2": "O",
        "3": "O",
        "4": "O",
        "5": "O",
        "6": "O",
        "7": "O",
        "8": "O",
        "9": "O"
      },
      "DN": {
        "0": "1st",
        "1": "2nd",
        "2": "1st",
        "3": "2nd",
        "4": "1st",
        "5": "1st",
        "6": "2nd",
        "7": "3rd",
        "8": "2nd",
        "9": "Third"
      },
      "Distance": {
        "0": "10",
        "1": "7",
        "2": "10",
        "3": "10th",
        "4": "10",
        "5": "10",
        "6": "5",
        "7": "5th",
        "8": "10",
        "9": "5"
      },
      "Hash": {
        "0": "Right",
        "1": "Right",
        "2": "Right",
        "3": "Right",
        "4": "Right",
        "5": "Right",
        "6": "Right",
        "7": "Right",
        "8": "Right",
        "9": "Right"
      },
      "Yard Line": {
        "0": "-23",
        "1": "-26",
        "2": "-46",
        "3": "-46",
        "4": "41",
        "5": "29",
        "6": "24",
        "7": "24",
        "8": "-46",
        "9": "24"
      },
      "Play Type": {
        "0": "Play",
        "1": "Play",
        "2": "Play",
        "3": "Play",
        "4": "Play",
        "5": "Rush",
        "6": "Play",
        "7": "Play",
        "8": "Play",
        "9": "Play"
      },
      "Result": {
        "0": "Complete",
        "1": "Complete",
        "2": "Incomplete",
        "3": "Warning",
        "4": "Complete",
        "5": "Rush",
        "6": "Incomplete",
        "7": "Touchdown + Extrapoint",
        "8": "",
        "9": "Touchdown + Extrapoint"
      },
      "GNLS": {
        "0": 23,
        "1": 3,
        "2": 20,
        "3": 0,
        "4": 13,
        "5": 12,
        "6": 5,
        "7": 24,
        "8": 30,
        "9": 24
      },
      "Play By": {
        "0": "Josh Allen",
        "1": "Josh Allen",
        "2": "Josh Allen",
        "3": "None",
        "4": "Josh Allen",
        "5": "Josh Allen",
        "6": "Josh Allen",
        "7": "Josh Allen",
        "8": "None",
        "9": "Josh Allen"
      },
      "Play To": {
        "0": "Stefon Diggs",
        "1": "Khalil Shakir",
        "2": "Stefon Diggs",
        "3": "None",
        "4": "Stefon Diggs",
        "5": "None",
        "6": "Quintin Morris",
        "7": "Khalil Shakir",
        "8": "None",
        "9": "Khalil Shakir"
      },
      "OFF Form": {
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "SHOTGUN",
        "9": ""
      },
      "DEF Form": {
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        "9": ""
      }
    }
  };

const columns = Object.keys(column.data);
const rows = Object.values(column.data[columns[0]]).map((_, index) => {
  return columns.map(col => column.data[col][index]);
});

const DataScreen = () => {
  // Previous state and functions
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);
  const [filterValue, setFilterValue] = useState('');

  const applyFilter = () => {
    const newFilteredRows = rows.filter(row => {
      const columnIndex = columns.indexOf(selectedColumn);
      return row[columnIndex] === filterValue;
    });
    setFilteredRows(newFilteredRows);
  };

  const clearFilter = () => {
    setFilteredRows(rows);
    setFilterValue('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {item.map((value, index) => (
        <Text style={styles.cell} key={index}>
          {value}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {/* Filter components */}
      </View>
      <View style={styles.headerRow}>
        {columns.map((column, index) => (
          <Text style={styles.headerCell} key={index}>
            {column}
          </Text>
        ))}
      </View>
      <FlatList
        data={filteredRows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B88FD',
    marginRight: 5,
  },
  pickerContainer: {
    flex: 2,
    height: 40,
    marginRight: 5,
  },
  picker: {
    backgroundColor: '#fafafa',
    borderColor: '#3B88FD',
    borderWidth: 1,
  },
  pickerItem: {
    justifyContent: 'flex-start',
    color: '#3B88FD',
  },
  dropDown: {
    backgroundColor: '#fafafa',
    borderColor: '#3B88FD',
    borderWidth: 1,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3B88FD',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 5,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#3B88FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3B88FD',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default DataScreen;