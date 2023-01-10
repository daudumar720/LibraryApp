import {React, useState} from 'react';

import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

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
import {useDispatch} from 'react-redux';
import {
  issueBook,
  rejectReservationRequest,
} from '../../redux/slices/librarian_slice';

import * as RootNavigation from '../../navigation_service';

export default function SampleRequestBookItem({book}) {
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
      marginHorizontal: 20,
      marginVertical: 10,
    },

    cover: {
      width: 95,
      height: 145,
      borderRadius: 10,
    },
    book: {
      color: colors.onSecondaryContainer,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    author: {
      color: colors.secondary,
      marginBottom: 5,
    },
    member: {
      marginLeft: 10,
      fontSize: 12,
      color: colors.tertiary,
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 3,
    },
    buttonsContainer: {
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'space-between',
      marginVertical: 3,
    },
  });

  const [rejectionVisible, setRejectionVisible] = useState(false);
  const [issueVisible, setIssueVisible] = useState(false);

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
          <Text style={styles.member}>{book.user}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            mode="contained-tonal"
            textColor={colors.tertiary}  
            onPress={() => setRejectionVisible(true)}>
            Reject
          </Button>
          <Button
            mode="contained-tonal"
            textColor={colors.onPrimaryContainer}
            onPress={() => setIssueVisible(true)}>
            Issue
          </Button>
        </View>
      </View>

      <Portal>
        <Dialog
          visible={rejectionVisible}
          onDismiss={() => setRejectionVisible(false)}>
          <Dialog.Title>Reject request</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to reject {book.user}'s issue request of
              book "{book.name}" ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setRejectionVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setRejectionVisible(!rejectionVisible);
                dispatch(rejectReservationRequest(book));
              }}>
              Reject
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={issueVisible} onDismiss={() => setIssueVisible(false)}>
          <Dialog.Title>Issue book</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to issue book "{book.name}" to {book.user} ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIssueVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setIssueVisible(!issueVisible);
                dispatch(issueBook(book));
              }}>
              Issue
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}
