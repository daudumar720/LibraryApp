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

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../../assets/icons/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder={'Enter email...'}
        style={styles.input}
        value={email}
        placeholderTextColor="#888"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder={'Enter password...'}
        style={styles.input}
        value={password}
        placeholderTextColor="#888"
        onChangeText={setPassword}
      />

      <Button
        mode="contained"
        style={{marginVertical: 20}}
        onPress={() => {
          navigation.navigate('Member');
        }}>
        Login
      </Button>
      <Button
        mode="contained"
        style={{marginVertical: 20}}
        onPress={() => {
          navigation.navigate('Librarian');
        }}>
        Login as admin
      </Button>

      <View style={styles.footerContainer}>
        <Text>Don't have an account?</Text>
        <Button
          mode="tonal-contained"
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          Signup
        </Button>
      </View>
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
  footerContainer: {
    marginTop: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
