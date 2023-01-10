import {React, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {Text, Searchbar, useTheme} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {EmptyState} from '../../common/empty_state';

import {fetchIssuedBooks} from '../../redux/slices/librarian_slice';

import SampleIssuedBookItem from '../components/sample_librarian_issued_book_item';

export default function IssuedRouteScreen() {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 10,
      marginTop: 20,
      color: colors.onBackground,
    },
  });

  const issuedBooks = useSelector(state => state.librarian.issuedBooks);
  const status = useSelector(state => state.librarian.issuedBooksStatus);

  // const dispatch = useDispatch();
  // if (issuedBooks == undefined) {
  //   dispatch(fetchIssuedBooks());
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Issued Books</Text>

      {status == 'loading' ? (
        <ActivityIndicator />
      ) : issuedBooks.length == 0 ? (
        <EmptyState
          title={'No issued books'}
          subtitle={
            'There are no issued books to the members right now. Issue a book to see it in this list.'
          }
        />
      ) : (
        <FlatList
          data={issuedBooks}
          renderItem={({item}) => <SampleIssuedBookItem book={item} />}
          keyExtractor={item => item.bookId}
        />
      )}
    </ScrollView>
  );
}
