import {React, useState} from 'react';

import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {
  Text,
  Card,
  Button,
  Portal,
  Dialog,
  Paragraph,
  useTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import * as RootNavigator from '../../navigation_service';

import {cancelBookReservation} from '../../redux/slices/member_slice';

export default function SampleReservedBookItem({reservedBook}) {
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
      flex: 1,
    },
    innerContainer: {
      marginHorizontal: 10,
    },

    cover: {
      width: 95,
      height: 145,
      borderRadius: 10,
    },
    delete: {
      backgroundColor: colors.error,
      borderRadius: 10,
      width: 60,
      height: 90,
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
    reservationDate: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cancelButton: {
      marginTop: 10,
      marginLeft: 100,
    },
  });

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        RootNavigator.navigate('BookDetailsViewOnly', reservedBook)
      }>
      <Card.Cover
        source={{uri: reservedBook.image}}
        style={styles.cover}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.book}>{reservedBook.name}</Text>
        <Text style={styles.author}>{reservedBook.author}</Text>
        <View style={styles.reservationDate}>
          <Icon name="clock-o" size={17} color={colors.tertiary} />
          <Text style={styles.time}>Reserved at {reservedBook.reservedAt}</Text>
        </View>
        <Button
          style={styles.cancelButton}
          mode="contained-tonal"
          textColor={colors.onErrorContainer}
          onPress={() => setVisible(true)}>
          Cancel
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirm cancellation</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to cancel reservation of the book "
              {reservedBook.name}" ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setVisible(!visible);
                dispatch(cancelBookReservation(reservedBook.bookId));
              }}>
              I am sure
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}
