import {React, useState} from 'react';

import {ScrollView, StyleSheet, View, Image, TextInput} from 'react-native';

import {
  Text,
  Button,
  IconButton,
  Portal,
  Paragraph,
  Dialog,
  MD3LightTheme as Theme,
} from 'react-native-paper';

import * as RootNavigation from '../../navigation_service';

export default function AddEditBook() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => setVisible(!visible);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="close" size={24} onPress={() => {}} />
        <Text style={styles.title}>Add book</Text>
        <Button
          mode="contained-tonal"
          textColor={Theme.colors.primary}
          style={{flex: 3}}
          onPress={() => {}}>
          Save
        </Button>
      </View>

      <TextInput
        placeholder={'Enter book name...'}
        style={styles.input}
        value={name}
        placeholderTextColor="#888"

        onChangeText={setName}
      />
      <TextInput
        placeholder={"Enter author's name..."}
        style={styles.input}
        value={author}
        placeholderTextColor="#888"

        onChangeText={setAuthor}
      />
      <TextInput
        placeholder={'Enter book description...'}
        style={styles.input}
        value={description}
        placeholderTextColor="#888"
        onChangeText={setDescription}
      />

      <Image
        source={require('../../../assets/covers/the-color-purple.jpg')}
        style={styles.cover}
      />

      <Button
        icon="image"
        mode="contained-tonal"
        textColor="#118866"
        backgroundColor="#dd2222dd"
        style={{marginHorizontal: 70, marginVertical: 10}}
        onPress={() => {}}>
        Add image
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
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
    backgroundColor: '#0f0fff11',
    borderRadius: 5,
    marginVertical: 10,
  },
});
