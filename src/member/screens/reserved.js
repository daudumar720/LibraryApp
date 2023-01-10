import {React} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {Text, useTheme} from 'react-native-paper';

import SampleReservedBookItem from '../components/sample_reserved_book_item';
import {useSelector, useDispatch} from 'react-redux';

import {fetchReservedBooks} from '../../redux/slices/member_slice';
import {EmptyState} from '../../common/empty_state';

export default function ReservedRouteScreen() {
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

  const reservedBooks = useSelector(state => state.member.reservedBooks);
  const status = useSelector(state => state.member.reservedBooksStatus);

  const dispatch = useDispatch();

  if (reservedBooks == undefined) {
    dispatch(fetchReservedBooks());
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reserved Books</Text>

      {status == 'loading' ? (
        <ActivityIndicator />
      ) : reservedBooks.length == 0 ? (
        <EmptyState
          title={'No reserved books'}
          subtitle={'You have not reserved any book from the library yet'}
        />
      ) : (
        <FlatList
          data={reservedBooks}
          renderItem={({item}) => (
            <SampleReservedBookItem reservedBook={item} />
          )}
          keyExtractor={(item, index) => index}
        />
      )}
    </ScrollView>
  );
}
