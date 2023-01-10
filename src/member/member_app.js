import {React, useState} from 'react';

import {BottomNavigation} from 'react-native-paper';

import BookRouteScreen from './screens/books';

import ReservedRouteScreen from './screens/reserved';
import IssuedRouteScreen from './screens/issued';

const renderScene = BottomNavigation.SceneMap({
  books: () => <BookRouteScreen />,
  reserved: () => <ReservedRouteScreen />,
  issued: () => <IssuedRouteScreen />,
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
    {key: 'reserved', title: 'Reserved', focusedIcon: 'calendar-alert'},
    {key: 'issued', title: 'Issued', focusedIcon: 'calendar-check'},
  ]);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
