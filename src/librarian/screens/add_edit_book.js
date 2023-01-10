import {React, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {
  Text,
  Button,
  IconButton,
  Paragraph,
  Dialog,
  Portal,

  useTheme,
} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {LoadingDialog} from '../../common/loading_dialog';

import {
  saveBook,
  hideDialog,
  bookSaved,
  pickImage,
} from '../../redux/slices/librarian_slice';

export default function AddEditBook({route, navigation}) {
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
      flex: 6,
      marginHorizontal: 5,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10,
    },
    cover: {
      height: 270,
      width: 200,
      alignSelf: 'center',
      backgroundColor: 'blue',
      borderRadius: 8,
      marginVertical: 10,
    },
    input: {
      paddingHorizontal: 20,
      backgroundColor: colors.surfaceVariant,
      borderRadius: 5,
      color: colors.onSurfaceVariant,
      marginVertical: 10,
    },
  });

  const original = route?.params?.original;

  const [name, setName] = useState(original?.name ?? '');
  const [author, setAuthor] = useState(original?.author ?? '');
  const [description, setDescription] = useState(original?.description ?? '');
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => setVisible(!visible);

  const dispatch = useDispatch();
  const dialog = useSelector(state => state.librarian.dialog);
  const loading = useSelector(state => state.librarian.loading);
  const saved = useSelector(state => state.librarian.saved);
  const image = useSelector(state => state.librarian.image);

  if (saved == true) {
    if (original == undefined) {
      navigation.goBack();
    } else {
      navigation.popToTop();
    }

    dispatch(bookSaved());
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="close"
          size={24}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.title}>Add book</Text>

        <Button
          mode="contained-tonal"
          textColor={colors.onBackground}
          backgroundColor={colors.secondary}
          style={{flex: 3}}
          onPress={() =>
            dispatch(
              saveBook({
                name: name,
                author: author,
                description: description,
                bookId: original?.bookId,
                image: image,
              }),
            )
          }>
          Save
        </Button>
      </View>

      <TextInput
        placeholder={'Enter book name...'}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder={"Enter author's name..."}
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />

      <TextInput
        placeholder={'Enter book description...'}
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Image
        source={
          image == undefined
            ? require('../../../assets/icons/image.jpg')
            : {uri: image}
        }
        style={styles.cover}
      />

      <Button
        icon="image"
        mode="contained-tonal"
        textColor={colors.onBackground}
        backgroundColor={colors.secondary}
        style={{marginHorizontal: 70, marginVertical: 10}}
        onPress={() => dispatch(pickImage())}>
        Add image
      </Button>

      <Portal>
        <Dialog
          visible={dialog !== undefined}
          onDismiss={() => dispatch(hideDialog())}>
          <Dialog.Title>Save failed</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialog}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => dispatch(hideDialog())}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <LoadingDialog text={'Saving book...'} visible={loading} />
    </ScrollView>
  );
}
