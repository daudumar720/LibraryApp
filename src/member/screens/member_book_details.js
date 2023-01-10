import {React, useState} from 'react';

import {ScrollView, StyleSheet, View, Image} from 'react-native';

import {
  Text,
  Button,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {reserveBook} from '../../redux/slices/member_slice';

import {LoadingDialog} from '../../common/loading_dialog';

export default function MemberBookDetailsScreen({route, navigation}) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: colors.background,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      color: colors.onBackground,
      marginHorizontal: 20,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10,
    },
    cover: {
      height: 310,
      width: 200,
      alignSelf: 'center',
      borderRadius: 8,
      marginBottom: 10,
    },
    detailContainer: {
      marginVertical: 8,
    },
    heading: {
      color: colors.onTertiaryContainer,
      backgroundColor: colors.tertiaryContainer,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 7,
      fontSize: 13,
    },
    body: {
      color: colors.onBackground,
      marginHorizontal: 5,
      marginTop: 4,
    },
    reserveButton: {
      marginBottom: 60
    },
  });

  const book = route.params;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const reservedBooks = useSelector(state => state.member.reservedBooks);
  const reserving = useSelector(state => state.member.reserving);

  let isReserved;
  if (reservedBooks == undefined) {
    isReserved = false;
  } else {
    isReserved =
      reservedBooks.find(item => item.bookId == book.bookId) != undefined;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Book Details</Text>
      </View>

      <Image source={{uri: book.image}} style={styles.cover} />

      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Name</Text>
        <Text
          style={{
            ...styles.body,
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          {book.name}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Author</Text>
        <Text
          style={{
            ...styles.body,
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          {book.author}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Description</Text>
        <Text style={{...styles.body, fontSize: 16}}>{book.description}</Text>
      </View>
      <View style={{height: 40}} />
      <Button
        mode="contained"
        style={styles.reserveButton}
        onPress={() => setVisible(true)}
        disabled={isReserved}>
        {isReserved ? 'Reserved' : 'Reserve'}
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirm reservation</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to reserve the book "{book.name}" ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setVisible(!visible);
                dispatch(reserveBook(book));
              }}>
              Reserve
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <LoadingDialog text={'Reserving book...'} visible={reserving} />
    </ScrollView>
  );
}
