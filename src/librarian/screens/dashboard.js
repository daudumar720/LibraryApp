import {React, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text,
  Portal,
  Dialog,
  Button,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logoutLibrarian} from '../../redux/slices/authentication_slice';
import {toggleTheme} from '../../redux/slices/theme_slice';

export default function DashboardRouteScreen() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontWeight: 'bold',
      marginRight: 15,
      fontSize: 24,
      marginLeft: 25,
      color: colors.onBackground,
    },
    itemsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    itemContainer: {
      flex: 1,
      marginHorizontal: 15,
      paddingHorizontal: 15,
      paddingVertical: 15,
      backgroundColor: '#ff000055',
      borderRadius: 16,
    },
    itemData: {
      color: 'white',
      fontSize: 30,
    },
    itemTitle: {
      color: 'white',
      backgroundColor: '#ff000055',
      fontSize: 12,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
  });

  const [visible, setVisible] = useState(false);

  const booksCount = useSelector(state => state.librarian.booksCount);
  const reservedBooksCount = useSelector(
    state => state.librarian.reservedBooksCount,
  );

  const issuedBooksCount = useSelector(
    state => state.librarian.issuedBooksCount,
  );

  const totalFine = useSelector(state => state.librarian.totalFine);

  const theme = useSelector(state => state.theme.theme);

  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
          <Icon
            name={theme == 'dark' ? 'sun-o' : 'moon-o'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={{width: 20}} />
        <Pressable onPress={() => setVisible(true)}>
          <Icon name="sign-out" size={24} color={colors.primary} />
        </Pressable>
      </View>

      {booksCount == undefined ||
      reservedBooksCount == undefined ||
      issuedBooksCount == undefined ||
      totalFine == undefined ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.itemsContainer}>
            <View style={{...styles.itemContainer, backgroundColor: '#44aa88'}}>
              <Text style={styles.itemData}>{booksCount}</Text>

              <Text style={{...styles.itemTitle, backgroundColor: '#449977'}}>
                Total books
              </Text>
            </View>

            <View style={{...styles.itemContainer, backgroundColor: '#5577ee'}}>
              <Text style={styles.itemData}>{issuedBooksCount}</Text>

              <Text style={{...styles.itemTitle, backgroundColor: '#4466cc'}}>
                Issued
              </Text>
            </View>
          </View>

          <View style={styles.itemsContainer}>
            <View style={{...styles.itemContainer, backgroundColor: '#aa7799'}}>
              <Text style={styles.itemData}>{reservedBooksCount}</Text>

              <Text style={{...styles.itemTitle, backgroundColor: '#996688'}}>
                Reservations
              </Text>
            </View>

            <View style={{...styles.itemContainer, backgroundColor: '#cc6655'}}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#ddd',
                    marginTop: 5,
                    marginRight: 5,
                    fontSize: 16,
                  }}>
                  $
                </Text>
                <Text style={styles.itemData}>{Number(totalFine)}</Text>
              </View>

              <Text style={{...styles.itemTitle, backgroundColor: '#cc5544'}}>
                Total fine
              </Text>
            </View>
          </View>
        </View>
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to logout from the system ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setVisible(!visible);
                dispatch(logoutLibrarian());
              }}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}
