import {React, useState} from 'react';

import {BottomNavigation} from 'react-native-paper';

import DashboardScreen from './screens/dashboard';
import BookRouteScreen from './screens/books';

import RequestsRouteScreen from './screens/reservations';
import IssuedRouteScreen from './screens/issued';
import {useDispatch} from 'react-redux';
import {
  fetchIssuedBooks,
  initializeDashboard,
} from '../redux/slices/librarian_slice';

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
      focusedIcon: 'view-dashboard',
      unfocusedIcon: 'view-dashboard-outline',
    },
    {
      key: 'books',
      title: 'Books',
      focusedIcon: 'book',
      unfocusedIcon: 'book-outline',
    },
    {key: 'requests', title: 'Reservations', focusedIcon: 'calendar-alert'},
    {key: 'issued', title: 'Issued', focusedIcon: 'calendar-check'},
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
