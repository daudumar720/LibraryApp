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
  Paragraph,
  Dialog,
  Portal,
  useTheme,
} from 'react-native-paper';

import {
  hideSignupDialog,
  loggedInAsLibrarian,
} from '../../redux/slices/authentication_slice';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../redux/slices/authentication_slice';
import {LoadingDialog} from '../../common/loading_dialog';

export default function LoginScreen({navigation}) {
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
      borderRadius: 5,
      color: colors.onSurfaceVariant,
      backgroundColor: colors.surfaceVariant,
      marginVertical: 10,
    },
    footerContainer: {
      marginTop: 140,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const dialog = useSelector(state => state.authentication.dialog);
  const loading = useSelector(state => state.authentication.loading);

  const loggedIn = useSelector(
    state => state.authentication.member !== undefined,
  );

  if (loggedIn) {
    navigation.navigate('Member');
  }

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
        onPress={() => dispatch(login({email: email, password: password}))}>
        Login
      </Button>

      <Button
        mode="contained"
        style={{marginVertical: 20}}
        onPress={() => dispatch(loggedInAsLibrarian())}>
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

        <LoadingDialog text={'Logging in...'} visible={loading} />
      </View>
    </ScrollView>
  );
}
