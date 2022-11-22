import {React, useState} from 'react';

import {ScrollView, StyleSheet, FlatList} from 'react-native';

import {Text, Searchbar} from 'react-native-paper';

import SampleBookItem from '../../librarian/components/sample_librarian_book_item';

export default function BookRouteScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Books</Text>
      <Searchbar
        placeholder="Search books..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={0}
        style={styles.searchBar}
        inputStyle={styles.searchInputStyle}
        placeholderTextColor="#777"
      />

      <FlatList
        data={[{}, {}, {}, {}, {}, {}, {}, {}]}
        renderItem={({item}) => <SampleBookItem />}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //paddingHorizontal: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 25,
    color: '#333',
  },
  searchBar: {
    backgroundColor: '#eee',
    marginVertical: 15,
    borderRadius: 20,
    marginHorizontal: 25,
    fontSize: 10,
    height: 45,
    color: 'white',
  },
  searchInputStyle: {
    color: '#444',
    fontSize: 16,
  },
});
