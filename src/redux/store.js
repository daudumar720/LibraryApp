import {configureStore} from '@reduxjs/toolkit';

import authenticationReducer from './slices/authentication_slice';
import memberReducer from './slices/member_slice';
import librarianReducer from './slices/librarian_slice';
import themeReducer from './slices/theme_slice';

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    member: memberReducer,
    librarian: librarianReducer,
    theme: themeReducer,
  },
});
