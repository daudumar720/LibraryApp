import {React, useState} from 'react';

import {ScrollView, StyleSheet, View, Image} from 'react-native';

import {
  Text,
  Button,
  IconButton,
  Portal,
  Paragraph,
  Dialog,
  MD3LightTheme as Theme,
} from 'react-native-paper';

export default function LibrarianBookDetailsScreen() {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => setVisible(!visible);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => console.log('Pressed')}
        />
        <Text style={styles.title}>Book Details</Text>
      </View>

      <Image
        source={require('../../../assets/covers/the-color-purple.jpg')}
        style={styles.cover}
      />

      <View style={{...styles.header, justifyContent: 'center'}}>
        <Button
          icon="pencil"
          mode="contained-tonal"
          textColor={Theme.colors.primary}
          onPress={() => console.log('Pressed')}>
          Edit
        </Button>
        <View style={{width: 15}} />
        <Button
          icon="delete"
          mode="contained-tonal"
          textColor="#dd2222dd"
          backgroundColor="#dd2222dd"
          onPress={toggleDialog}>
          Delete
        </Button>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Name</Text>
        <Text style={{...styles.body, fontWeight: 'bold', fontSize: 17}}>
          Gracia
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Author</Text>
        <Text style={{...styles.body, fontWeight: 'bold', fontSize: 17}}>
          Karl Marx
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Description</Text>
        <Text style={{...styles.body, fontSize: 16}}>karl Marx</Text>
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
            <Button onPress={toggleDialog}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    height: 270,
    width: 200,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 8,
    marginBottom: 10,
  },
  detailContainer: {
    marginVertical: 8,
  },
  heading: {
    color: '#228844',
    backgroundColor: '#33aa4466',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 7,
    fontSize: 13,
  },
  body: {
    color: '#333dd',
    marginHorizontal: 5,
    marginTop: 4,
  },
});
