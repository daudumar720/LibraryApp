import {React, useState} from 'react';

import {ScrollView, StyleSheet, FlatList} from 'react-native';

import {Text, Searchbar} from 'react-native-paper';

import SampleReservedBookItem from '../components/sample_librarian_reserved_book_item';

export default function ReservationsRouteScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reserved Books</Text>

      <FlatList
        data={[{}, {}, {}, {}, {}, {}, {}, {}]}
        renderItem={({item}) => <SampleReservedBookItem />}
        //Setting the number of column
        // numColumns={2}
        keyExtractor={(item, index) => index}
      />
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
});
