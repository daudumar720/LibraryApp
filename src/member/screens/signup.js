import {React, useState} from 'react';
import {ScrollView, StyleSheet, Image, TextInput} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {hideSignupDialog} from '../../redux/slices/authentication_slice';

import {
  Text,
  Button,
  Paragraph,
  Dialog,
  Portal,
  useTheme,
} from 'react-native-paper';

import {signup} from '../../redux/slices/authentication_slice';
import {LoadingDialog} from '../../common/loading_dialog';

export default function SignupScreen() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      paddingTop: 100,
      backgroundColor: colors.background,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      color: colors.onBackground,
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
      backgroundColor: colors.surfaceVariant,
      borderRadius: 5,
      color: colors.onSurfaceVariant,
      marginVertical: 10,
    },
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const dialog = useSelector(state => state.authentication.dialog);
  const loading = useSelector(state => state.authentication.loading);

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

      <Button
        mode="contained"
        style={{marginVertical: 20}}
        onPress={() =>
          dispatch(signup({name: name, email: email, password: password}))
        }>
        Signup
      </Button>

      <Portal>
        <Dialog
          visible={dialog !== undefined}
          onDismiss={() => dispatch(hideSignupDialog())}>
          <Dialog.Title>{dialog?.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialog?.body}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => dispatch(hideSignupDialog())}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <LoadingDialog text={'Signing up...'} visible={loading} />
    </ScrollView>
  );
}
