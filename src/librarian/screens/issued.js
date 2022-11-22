import {React, useState} from 'react';

import {ScrollView, StyleSheet, FlatList} from 'react-native';

import {Text, Searchbar} from 'react-native-paper';

import SampleIssuedBookItem from '../components/sample_librarian_issued_book_item';

export default function IssuedRouteScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Issued Books</Text>

      <FlatList
        data={[{}, {}, {}, {}, {}, {}, {}, {}]}
        renderItem={({item}) => <SampleIssuedBookItem />}
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
