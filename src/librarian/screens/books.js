import {React, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';

import {Text, FAB, Searchbar, useTheme} from 'react-native-paper';

import SampleBookItem from '../components/sample_librarian_book_item';

import * as RootNavigation from '../../navigation_service';

import {useSelector, useDispatch} from 'react-redux';

import {fetchBooks, searchBooks} from '../../redux/slices/librarian_slice';
import {EmptyState} from '../../common/empty_state';

export default function BookRouteScreen() {
  const {colors} = useTheme();

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
      color: colors.onBackground,
    },
    searchBar: {
      backgroundColor: colors.surfaceVariant,
      marginVertical: 15,
      borderRadius: 20,
      marginHorizontal: 25,
      fontSize: 10,
      height: 45,
      color: 'white',
    },
    searchInputStyle: {
      color: colors.onBackground,
      fontSize: 16,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

  const searchQuery = useSelector(state => state.librarian.searchQuery);
  const searchedBooks = useSelector(state => state.librarian.searchedBooks);

  const books = useSelector(state => state.librarian.books);
  const status = useSelector(state => state.librarian.booksStatus);

  const dispatch = useDispatch();

  if (books == undefined) {
    dispatch(fetchBooks());
  }

  return (
    <View style={{height: '100%'}}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Books</Text>

        <Searchbar
          placeholder="Search books..."
          onChangeText={query => dispatch(searchBooks(query))}
          elevation={0}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInputStyle}
          placeholderTextColor="#777"
        />

        {status == 'loading' ? (
          <ActivityIndicator />
        ) : (status == 'search' && searchedBooks.length == 0) ||
          (status == 'loaded' && books.length == 0) ? (
          status == 'loaded' ? (
            <EmptyState
              title={'No books found'}
              subtitle={'No books have been added to the library database yet'}
            />
          ) : (
            <EmptyState
              title={'No matching books'}
              subtitle={
                'No books were found matching your searched query, please try some other search term'
              }
            />
          )
        ) : (
          <FlatList
            data={status == 'search' ? searchedBooks : books}
            contentContainerStyle={{marginHorizontal: 15}}
            renderItem={({item}) => <SampleBookItem book={item} />}
            numColumns={2}
            keyExtractor={(item, index) => item.bookId}
          />
        )}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          RootNavigation.navigate('AddEditBook');
        }}
      />
    </View>
  );
}
