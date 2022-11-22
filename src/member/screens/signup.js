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

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../../assets/icons/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder={'Enter name...'}
        style={styles.input}
        value={name}
        placeholderTextColor="#888"
        onChangeText={setName}
      />
      <TextInput
        placeholder={'Enter email...'}
        style={styles.input}
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder={'Enter password...'}
        style={styles.input}
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
      />

      <Button mode="contained" style={{marginVertical: 20}} onPress={() => {}}>
        Signup
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
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
