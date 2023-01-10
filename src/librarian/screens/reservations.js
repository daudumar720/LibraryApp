import {React} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {Text, Searchbar, useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {EmptyState} from '../../common/empty_state';
import {fetchReservedBooks} from '../../redux/slices/librarian_slice';

import SampleReservedBookItem from '../components/sample_librarian_reserved_book_item';

export default function ReservationsRouteScreen() {
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

  const reservations = useSelector(state => state.librarian.reservedBooks);
  const status = useSelector(state => state.librarian.reservedBooksStatus);

  const dispatch = useDispatch();

  if (reservations == undefined) {
    dispatch(fetchReservedBooks());
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reserved Books</Text>

      {status == 'loading' ? (
        <ActivityIndicator />
      ) : reservations.length == 0 ? (
        <EmptyState
          title={'No reserved books'}
          subtitle={
            'There are no book reservation requests from the members yet'
          }
        />
      ) : (
        <FlatList
          data={reservations}
          renderItem={({item}) => <SampleReservedBookItem book={item} />}
          keyExtractor={(item, index) => index}
        />
      )}
    </ScrollView>
  );
}
