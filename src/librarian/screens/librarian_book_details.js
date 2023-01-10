import {React, useState} from 'react';

import {ScrollView, StyleSheet, View, Image} from 'react-native';

import {
  Text,
  Button,
  IconButton,
  Portal,
  Paragraph,
  Dialog,
  useTheme,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {deleteBook} from '../../redux/slices/librarian_slice';

export default function LibrarianBookDetailsScreen({route, navigation}) {
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
  });

  const book = route.params;

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleDialog = () => setVisible(!visible);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          color={colors.onBackground}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Book Details</Text>
      </View>

      <Image source={{uri: book.image}} style={styles.cover} />

      <View style={{...styles.header, justifyContent: 'center'}}>
        <Button
          icon="pencil"
          mode="contained-tonal"
          textColor={colors.primary}
          onPress={() => navigation.navigate('AddEditBook', {original: book})}>
          Edit
        </Button>
        <View style={{width: 15}} />
        <Button
          icon="delete"
          mode="contained-tonal"
          textColor={colors.error}
          onPress={toggleDialog}>
          Delete
        </Button>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Name</Text>
        <Text
          style={{
            ...styles.body,
            fontWeight: 'bold',
            fontSize: 17,
            color: colors.onBackground,
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
            color: colors.onBackground,
          }}>
          {book.author}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Description</Text>
        <Text
          style={{...styles.body, fontSize: 16, color: colors.onBackground}}>
          {book.description}
        </Text>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.Title>Delete Book</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete this book from database?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>Cancel</Button>
            <Button
              onPress={() => {
                toggleDialog();
                dispatch(deleteBook(book));
                navigation.popToTop();
              }}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}
