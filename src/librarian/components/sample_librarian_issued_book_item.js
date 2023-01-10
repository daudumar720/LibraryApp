import {React, useState} from 'react';

import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import {
  Text,
  Card,
  Title,
  Button,
  Portal,
  Dialog,
  Paragraph,
  useTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as RootNavigation from '../../navigation_service';

import {useDispatch} from 'react-redux';
import {returnBook} from '../../redux/slices/librarian_slice';

export default function SampleIssuedBookItem({book}) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      display: 'flex',
      flexDirection: 'row',
      elevation: 1,
      shadowRadius: 10,
      borderRadius: 10,
      backgroundColor: colors.secondaryContainer,
      alignItems: 'center',
    },
    innerContainer: {
      marginHorizontal: 15,
      marginVertical: 5,
    },
    cover: {
      width: 95,
      height: 210,
      borderRadius: 10,
    },
    book: {
      color: colors.onSecondaryContainer,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    author: {
      color: colors.secondary,
      marginBottom: 5,
    },
    time: {
      marginLeft: 10,
      fontSize: 12,
      color: colors.tertiary,
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
  });

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => RootNavigation.navigate('BookDetailsViewOnly', book)}>
      <Card.Cover source={{uri: book.image}} style={styles.cover} />
      <View style={styles.innerContainer}>
        <Text style={styles.book}>{book.name}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.dateContainer}>
          <Icon name="user-circle-o" size={17} color={colors.tertiary} />
          <Text style={styles.time}>{book.user}</Text>
        </View>

        <View style={styles.dateContainer}>
          <Icon name="clock-o" size={17} color={colors.tertiary} />
          <Text style={styles.time}>Issued at {book.issuedAt}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Icon name="calendar-minus-o" size={17} color={colors.tertiary} />
          <Text style={{...styles.time, color: colors.tertiary}}>
            Due at {book.dueAt}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Icon name="dollar" size={17} color={colors.tertiary} />
          <Text style={{...styles.time, color: colors.tertiary, marginLeft: 18}}>
            Late fine: {book.fine}
          </Text>
        </View>

        <Button
          mode="contained-tonal"
          textColor={colors.secondary}
          style={{marginLeft: 80, marginVertical: 5}}
          onPress={() => setVisible(true)}>
          Returned
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Return book</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to mark the book "{book.name}" as returned
              from {book.user} ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setVisible(!visible);
                dispatch(returnBook(book));
              }}>
              Returned
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}
