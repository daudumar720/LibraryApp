import {React, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import {
  Text,
  Searchbar,
  Portal,
  Dialog,
  Paragraph,
  useTheme,
  Button,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';
import SampleBookItem from '../components/sample_book_item';

import {fetchBooks, searchBooks} from '../../redux/slices/member_slice';
import {EmptyState} from '../../common/empty_state';
import {logoutMember} from '../../redux/slices/authentication_slice';
import {toggleTheme} from '../../redux/slices/theme_slice';

export default function BookRouteScreen() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontWeight: 'bold',
      marginRight: 160,
      fontSize: 24,
      marginLeft: 25,
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
  });

  const [visible, setVisible] = useState(false);

  const searchQuery = useSelector(state => state.member.searchQuery);
  const searchedBooks = useSelector(state => state.member.searchedBooks);

  const books = useSelector(state => state.member.books);
  const status = useSelector(state => state.member.booksStatus);

  const theme = useSelector(state => state.theme.theme);

  const dispatch = useDispatch();

  if (books == undefined) {
    dispatch(fetchBooks());
  }

  return (
    <ScrollView style={{height: '100%'}}>
      <View style={styles.header}>
        <Text style={styles.title}>Books</Text>
        <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
          <Icon
            name={theme == 'dark' ? 'sun-o' : 'moon-o'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={{width: 30}} />
        <Pressable onPress={() => setVisible(true)}>
          <Icon name="sign-out" size={24} color={colors.primary} />
        </Pressable>
      </View>
      <Searchbar
        placeholder="Search books..."
        onChangeText={query => dispatch(searchBooks(query))}
        value={searchQuery}
        elevation={0}
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

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to logout from the system ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setVisible(!visible);
                dispatch(logoutMember());
              }}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}
