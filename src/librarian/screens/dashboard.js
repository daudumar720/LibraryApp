import {React, useState} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';

import {Text, Searchbar} from 'react-native-paper';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

import SampleBookItem from '../components/sample_librarian_book_item';

export default function DashboardRouteScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.itemsContainer}>
        <View style={{...styles.itemContainer, backgroundColor: '#44aa88'}}>
          <Text style={styles.itemData}>26</Text>

          <Text style={{...styles.itemTitle, backgroundColor: '#449977'}}>
            Total books
          </Text>
        </View>

        <View style={{...styles.itemContainer, backgroundColor: '#5577ee'}}>
          <Text style={styles.itemData}>9</Text>

          <Text style={{...styles.itemTitle, backgroundColor: '#4466cc'}}>
            Issued
          </Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <View style={{...styles.itemContainer, backgroundColor: '#aa7799'}}>
          <Text style={styles.itemData}>3</Text>

          <Text style={{...styles.itemTitle, backgroundColor: '#996688'}}>
            Reservations
          </Text>
        </View>

        <View style={{...styles.itemContainer, backgroundColor: '#cc6655'}}>
          <Text style={styles.itemData}>280</Text>

          <Text style={{...styles.itemTitle, backgroundColor: '#cc5544'}}>
            Total fine
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ff000055',
    borderRadius: 16,
  },
  itemData: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 30,
  },
  itemTitle: {
    color: 'white',
    backgroundColor: '#ff000055',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
