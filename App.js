import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import MemberApp from './src/member/member_app';
import SignupScreen from './src/member/screens/signup';
import LibrarianApp from './src/librarian/librarian_app';
import AddEditBook from './src/librarian/screens/add_edit_book';
import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';
import LoginScreen from './src/member/screens/login';
import MemberBookDetails from './src/member/screens/member_book_details';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/navigation_service';
import {useSelector} from 'react-redux';
import LibrarianBookDetailsScreen from './src/librarian/screens/librarian_book_details';
import BookDetailsScreenViewOnly from './src/common/book_details_view_only';

const Stack = createNativeStackNavigator();

const light = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
  },
};

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};

export default function Main() {
  const memberIsAuthenticated = useSelector(
    state => state.authentication.member != undefined,
  );
  const librarianIsAuthenticated = useSelector(
    state => state.authentication.librarian == true,
  );

  const theme = useSelector(state => state.theme.theme);

  return (
    <NavigationContainer ref={navigationRef}>
      <PaperProvider theme={theme == 'light' ? light : dark}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {memberIsAuthenticated ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Member" component={MemberApp} />
              <Stack.Screen name="BookDetails" component={MemberBookDetails} />
              <Stack.Screen
                name="BookDetailsViewOnly"
                component={BookDetailsScreenViewOnly}
              />
            </Stack.Group>
          ) : librarianIsAuthenticated ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Librarian" component={LibrarianApp} />
              <Stack.Screen name="AddEditBook" component={AddEditBook} />
              <Stack.Screen
                name="BookDetails"
                component={LibrarianBookDetailsScreen}
              />
              <Stack.Screen
                name="BookDetailsViewOnly"
                component={BookDetailsScreenViewOnly}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
