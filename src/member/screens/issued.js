import {React, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {Text, Searchbar, useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import SampleIssuedBookItem from '../components/sample_issued_book_item';

import {fetchIssuedBooks} from '../../redux/slices/member_slice';
import {EmptyState} from '../../common/empty_state';

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

  const issuedBooks = useSelector(state => state.member.issuedBooks);
  const status = useSelector(state => state.member.issuedBooksStatus);
  const dispatch = useDispatch();

  if (issuedBooks == undefined) {
    dispatch(fetchIssuedBooks());
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Issued Books</Text>

      {status == 'loading' ? (
        <ActivityIndicator />
      ) : issuedBooks.length == 0 ? (
        <EmptyState
          title={'No issued books'}
          subtitle={'You have not issued a book from the library yet'}
        />
      ) : (
        <FlatList
          data={issuedBooks}
          renderItem={({item}) => <SampleIssuedBookItem issuedBook={item} />}
          keyExtractor={(item, index) => index}
        />
      )}
    </ScrollView>
  );
}
