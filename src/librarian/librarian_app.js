import {React, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

import {Appbar, BottomNavigation} from 'react-native-paper';

import DashboardScreen from './screens/dashboard';
import BookRouteScreen from './screens/books';

import RequestsRouteScreen from './screens/reservations';
import IssuedRouteScreen from './screens/issued';
import {useDispatch} from 'react-redux';
import {
  fetchIssuedBooks,
  initializeDashboard,
} from '../redux/slices/librarian_slice';

const IssuedRoute = () => <Text>Recents</Text>;

const FinesRoute = () => <Text>Notifications</Text>;

const renderScene = BottomNavigation.SceneMap({
  dashboard: () => <DashboardScreen />,
  books: () => <BookRouteScreen />,
  requests: () => <RequestsRouteScreen />,
  issued: () => <IssuedRouteScreen />,
});

export default LibrarianApp = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'dashboard',
      title: 'Dashboard',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
    {
      key: 'books',
      title: 'Books',
      focusedIcon: 'book',
      unfocusedIcon: 'book-outline',
    },
    {key: 'requests', title: 'Reservations', focusedIcon: 'abacus'},
    {key: 'issued', title: 'Issued', focusedIcon: 'history'},
  ]);

  const dispatch = useDispatch();
  dispatch(initializeDashboard());

  dispatch(fetchIssuedBooks());

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
