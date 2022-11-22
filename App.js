import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import MemberApp from './src/member/member_app';
import SignupScreen from './src/member/screens/signup';
import LibrarianApp from './src/librarian/librarian_app';
import AddEditBook from './src/librarian/screens/add_edit_book';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import LoginScreen from './src/member/screens/login';
import MemberBookDetails from './src/member/screens/member_book_details';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/navigation_service';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <NavigationContainer ref={navigationRef}>
      <PaperProvider theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Member" component={MemberApp} />
          <Stack.Screen name="BookDetails" component={MemberBookDetails} />
          <Stack.Screen name="Librarian" component={LibrarianApp} />
          <Stack.Screen name="AddEditBook" component={AddEditBook} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
