import {createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    member: auth().currentUser?.uid,
    librarian: false,
    dialog: undefined,
    loading: false,
  },
  reducers: {
    signedUp: (state, action) => {
      state.loading = false;
      state.dialog = {
        title: 'Signup successful',
        body: 'Your account has been created',
      };
    },
    loggedInAsMember: (state, action) => {
      state.loading = false;
      state.member = action.payload;
    },
    loggedInAsLibrarian: (state, action) => {
      state.librarian = true;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.dialog = action.payload;
    },
    signupFailed: (state, action) => {
      state.loading = false;
      state.dialog = action.payload;
    },
    hideSignupDialog: state => {
      state.dialog = undefined;
    },
    toggleLoadingDialog: (state, action) => {
      state.loading = action.payload;
    },
    loggedOutMember: (state, action) => {
      state.member = undefined;
    },
    logoutLibrarian: (state, action) => {
      state.librarian = false;
    },
  },
});

export const {
  signedUp,
  hideSignupDialog,
  signupFailed,
  loggedInAsMember,
  loggedInAsLibrarian,
  loginFailed,
  toggleLoadingDialog,
  loggedOutMember,
  logoutLibrarian,
} = authenticationSlice.actions;

export const login = details => async dispatch => {
  dispatch(toggleLoadingDialog(true));

  if (details.email.trim().length == 0) {
    dispatch(
      signupFailed({
        title: 'Field required',
        body: 'Please enter your email',
      }),
    );
  } else if (details.password.trim().length == 0) {
    dispatch(
      signupFailed({
        title: 'Field required',
        body: 'Please enter your password',
      }),
    );
  } else {
    try {
      let user = await auth().signInWithEmailAndPassword(
        details.email,
        details.password,
      );

      dispatch(loggedInAsMember(details));
    } catch (err) {
      dispatch(
        loginFailed({
          title: 'Login failed',
          body: 'Invalid credentials',
        }),
      );
    }
  }
};

export const signup = details => async dispatch => {
  dispatch(toggleLoadingDialog(true));
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (details.name.trim().length == 0) {
    dispatch(
      signupFailed({
        title: 'Field required',
        body: 'Please enter your name',
      }),
    );
  } else if (details.email.trim().length == 0) {
    dispatch(
      signupFailed({
        title: 'Field required',
        body: 'Please enter your email',
      }),
    );
  } else if (!emailRegex.test(details.email)) {
    dispatch(
      signupFailed({
        title: 'Signup failed',
        body: 'Please enter a valid email',
      }),
    );
  } else if (details.password.trim().length == 0) {
    dispatch(
      signupFailed({
        title: 'Field required',
        body: 'Please enter a password',
      }),
    );
  } else if (!details.password.match(passwordRegex)) {
    dispatch(
      signupFailed({
        title: 'Signup failed',
        body: 'Please enter a password having at least 8 characters, one capital letter, one small letter and a number',
      }),
    );
  } else {
    try {
      let user = await auth().createUserWithEmailAndPassword(
        details.email,
        details.password,
      );

      await firestore().collection('users').doc(user.user.uid).set({
        name: details.name,
      });

      await auth().signOut();

      dispatch(signedUp(details));
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
          dispatch(
            signupFailed({
              title: 'Signup failed',
              body: 'Please enter a valid email',
            }),
          );
          break;
        case 'auth/weak-password':
          dispatch(
            signupFailed({
              title: 'Signup failed',
              body: 'Please enter a stronger password',
            }),
          );
          break;
      }
    }
  }
};

export const logoutMember = () => async dispatch => {
  await auth().signOut();
  dispatch(loggedOutMember());
};

export default authenticationSlice.reducer;
