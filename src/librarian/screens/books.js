import {React, useState} from 'react';

import {ScrollView, StyleSheet, FlatList, View} from 'react-native';

import {Text, FAB, Searchbar} from 'react-native-paper';

import SampleBookItem from '../components/sample_librarian_book_item';

import * as RootNavigation from '../../navigation_service'; 

export default function BookRouteScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {RootNavigation.navigate('AddEditBook')}}
      />
    </View>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
