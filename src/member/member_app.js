import {React, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Appbar, BottomNavigation} from 'react-native-paper';

import BookRouteScreen from './screens/books';

import ReservedRouteScreen from './screens/reserved';
import IssuedRouteScreen from './screens/issued';
const IssuedRoute = () => <Text>Recents</Text>;

const FinesRoute = () => <Text>Notifications</Text>;

const renderScene = BottomNavigation.SceneMap({
  books: () => <BookRouteScreen />,
  reserved: () => <ReservedRouteScreen />,
  issued: () => <IssuedRouteScreen />,
  //fines: FinesRoute,
});

export default MemberApp = ({navigation}) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: 'books',
      title: 'Books',
      focusedIcon: 'book',
      unfocusedIcon: 'book-outline',
    },
    {key: 'reserved', title: 'Reserved', focusedIcon: 'abacus'},
    {key: 'issued', title: 'Issued', focusedIcon: 'history'},
    // {
    //   key: 'fines',
    //   title: 'Fines',
    //   focusedIcon: 'bell',
    //   unfocusedIcon: 'bell-outline',
    // },
  ]);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
