import {createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {formatDate} from '../../date_formatter';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const initialState = {
  booksStatus: 'loading',
  reservedBooksStatus: 'loading',
  issuedBooksStatus: 'loading',
  books: undefined,
  reservedBooks: undefined,
  issuedBooks: undefined,
  dialog: undefined,
  loading: false,
  saved: false,
  booksCount: undefined,
  issuedBooksCount: undefined,
  reservedBooksCount: undefined,
  totalFine: undefined,
  searchQuery: '',
  searchedBooks: undefined,
  image: undefined,
};

const librarianSlice = createSlice({
  name: 'librarian',
  initialState: initialState,
  reducers: {
    booksLoaded: (state, action) => {
      state.booksStatus = 'loaded';
      state.books = action.payload;
    },
    reservedBooksLoaded: (state, action) => {
      state.reservedBooksStatus = 'loaded';
      state.reservedBooks = action.payload;
    },
    issuedBooksLoaded: (state, action) => {
      state.issuedBooksStatus = 'loaded';
      state.issuedBooks = action.payload;
    },
    toggleLoadingDialog: (state, action) => {
      state.loading = action.payload;
    },
    bookSaveFailed: (state, action) => {
      state.loading = false;
      state.dialog = action.payload;
    },
    hideDialog: state => {
      state.dialog = undefined;
    },
    bookSaved: state => {
      state.saved = !state.saved;
      state.loading = false;
      state.image = undefined;
    },
    updateBooksCount: (state, action) => {
      state.booksCount = action.payload;
    },
    updateReservedBooksCount: (state, action) => {
      state.reservedBooksCount = action.payload;
    },
    updateIssuedBooksCount: (state, action) => {
      state.issuedBooksCount = action.payload;
    },
    updateTotalFine: (state, action) => {
      state.totalFine = action.payload;
    },
    markReserveRequestAsRejected: (state, action) => {
      state.reservedBooksCount = state.reservedBooksCount - 1;
      state.reservedBooks = state.reservedBooks.filter(
        item => item.bookId != action.payload.bookId,
      );
    },
    markBookAsIssued: (state, action) => {
      state.issuedBooksCount = state.issuedBooksCount + 1;
      state.reservedBooksCount = state.reservedBooksCount - 1;
      state.issuedBooks =
        state.issuedBooks == undefined
          ? [action.payload]
          : state.issuedBooks.push(action.payload);
      state.reservedBooks = state.reservedBooks.filter(
        item => item.bookId != action.payload.bookId,
      );
    },
    markBookAsReturned: (state, action) => {
      state.issuedBooksCount = state.issuedBooksCount - 1;
      state.issuedBooks = state.issuedBooks.filter(
        item => item.bookId != action.payload.bookId,
      );
    },
    imagePicked: (state, action) => {
      state.image = action.payload;
    },
    searchBooks: (state, action) => {
      if (action.payload == '') {
        state.searchedBooks = state.books;
        state.booksStatus = 'loaded';
      } else {
        state.searchedBooks = state.books.filter(
          item =>
            item.name.includes(action.payload) ||
            item.author.includes(action.payload),
        );
        state.booksStatus = 'search';
      }

      state.searchQuery = action.payload;
    },
  },
});

export const {
  booksLoaded,
  reservedBooksLoaded,
  issuedBooksLoaded,
  toggleLoadingDialog,
  bookSaveFailed,
  hideDialog,
  bookSaved,
  updateBooksCount,
  updateIssuedBooksCount,
  updateReservedBooksCount,
  updateTotalFine,
  markBookAsIssued,
  markBookAsReturned,
  markReserveRequestAsRejected,
  searchBooks,
  imagePicked,
} = librarianSlice.actions;

export const fetchBooks = () => async dispatch => {
  firestore()
    .collection('books')
    .onSnapshot(querySnapshot => {
      let books = [];

      let docs = querySnapshot.docs;
      for (let doc of docs) {
        books.push({
          bookId: doc.id,
          name: doc.get('name'),
          author: doc.get('author'),
          description: doc.get('description'),
          image: doc.get('image'),
        });
      }

      dispatch(booksLoaded(books));
    });
};

export const fetchReservedBooks = () => async dispatch => {
  firestore()
    .collection('reserved_books')
    .onSnapshot(async querySnapshot => {
      let reservedBooks = [];

      let docs = querySnapshot.docs;

      for (let userDoc of docs) {
        let userReservedBooks = await userDoc.ref
          .collection('reserved_books')
          .get();

        for (let userReservedBook of userReservedBooks.docs) {
          let book = await firestore()
            .collection('books')
            .doc(userReservedBook.id)
            .get();

          let user = await firestore()
            .collection('users')
            .doc(userDoc.id)
            .get();

          reservedBooks.push({
            uid: userDoc.id,
            bookId: book.id,
            user: user.get('name'),
            name: book.get('name'),
            author: book.get('author'),
            description: book.get('description'),
            image: book.get('image'),
            reservedAt: userReservedBook.get('reservedAt'),
          });
        }
      }

      dispatch(reservedBooksLoaded(reservedBooks));
    });
};

export const fetchIssuedBooks = () => async dispatch => {
  firestore()
    .collection('issued_books')
    .onSnapshot(async querySnapshot => {
      let issuedBooks = [];

      let docs = querySnapshot.docs;

      for (let userDoc of docs) {
        let userIssuedBooks = await userDoc.ref
          .collection('issued_books')
          .get();

        for (let userIssuedBook of userIssuedBooks.docs) {
          let book = await firestore()
            .collection('books')
            .doc(userIssuedBook.id)
            .get();

          let user = await firestore()
            .collection('users')
            .doc(userDoc.id)
            .get();

          issuedBooks.push({
            uid: userDoc.id,
            bookId: book.id,
            user: user.get('name'),
            name: book.get('name'),
            author: book.get('author'),
            description: book.get('description'),
            image: book.get('image'),
            issuedAt: formatDate(userIssuedBook.get('issuedAt')),
            dueAt: formatDate(userIssuedBook.get('dueAt')),
            fine: calculateFine(userIssuedBook.get('dueAt')),
          });
        }
      }

      dispatch(issuedBooksLoaded(issuedBooks));
    });
};

function calculateFine(dueDate) {
  let lateMilliseconds = Date.now() - dueDate;
  if (lateMilliseconds > 0) {
    let lateDays = lateMilliseconds / 86400000;
    return (lateDays * 5).toFixed(0);
  }

  return 0;
}

export const saveBook = details => async dispatch => {
  dispatch(toggleLoadingDialog(true));

  if (details.name.trim().length == 0) {
    dispatch(bookSaveFailed('Please enter name of the book'));
  } else if (details.author.trim().length == 0) {
    dispatch(bookSaveFailed("Please enter book's author name"));
  } else if (details.description.trim().length == 0) {
    dispatch(bookSaveFailed('Please enter description of the book'));
  } else if (details.image == undefined) {
    dispatch(bookSaveFailed('Please attach the cover of the the book'));
  } else {
    let book = {
      name: details.name,
      author: details.author,
      description: details.description,
    };

    if (details.bookId != undefined) {
      await firestore().collection('books').doc(details.bookId).update(book);
    } else {
      let ref = await firestore().collection('books').add(book);
      if (details.image != undefined) {
        let imageRef = storage().ref(`books/${ref.id}.jpg`);
        await imageRef.putFile(details.image);
        const url = await imageRef.getDownloadURL();
        await firestore().collection('books').doc(ref.id).update({image: url});
      }
    }

    dispatch(bookSaved());
  }
};

export const deleteBook = book => async dispatch => {
  await firestore().collection('books').doc(book.bookId).delete();
  await storage().ref(`books/${book.id}.jpg`).delete();
};

export const rejectReservationRequest = reservation => async dispatch => {
  await firestore()
    .collection('reserved_books')
    .doc(reservation.uid)
    .collection('reserved_books')
    .doc(reservation.bookId)
    .delete();

  dispatch(markReserveRequestAsRejected(reservation));
};

export const issueBook = reservation => async dispatch => {
  dispatch(fetchIssuedBooks());

  await firestore().collection('issued_books').doc(reservation.uid).set({
    uid: reservation.uid,
  });

  let issueObject = {
    issuedAt: Date.now(),
    dueAt: Date.now() + 2592000000,
  };

  await firestore()
    .collection('issued_books')
    .doc(reservation.uid)
    .collection('issued_books')
    .doc(reservation.bookId)
    .set(issueObject);

  await firestore()
    .collection('reserved_books')
    .doc(reservation.uid)
    .collection('reserved_books')
    .doc(reservation.bookId)
    .delete();

  dispatch(markBookAsIssued({...reservation, ...issueObject}));
};

export const returnBook = book => async dispatch => {
  await firestore()
    .collection('issued_books')
    .doc(book.uid)
    .collection('issued_books')
    .doc(book.bookId)
    .delete();

  dispatch(markBookAsReturned(book));
};

export const initializeDashboard = () => async dispatch => {
  firestore()
    .collection('books')
    .onSnapshot(querySnapshot => {
      dispatch(updateBooksCount(querySnapshot.docs.length));
    });

  firestore()
    .collection('reserved_books')
    .onSnapshot(async querySnapshot => {
      let reservedBooksCount = 0;

      let docs = querySnapshot.docs;

      for (let userDoc of docs) {
        let userReservedBooks = await userDoc.ref
          .collection('reserved_books')
          .get();

        reservedBooksCount += userReservedBooks.docs.length;
      }

      dispatch(updateReservedBooksCount(reservedBooksCount));
    });

  firestore()
    .collection('issued_books')
    .onSnapshot(async querySnapshot => {
      let issuedBooksCount = 0;
      let totalFine = 0;

      let docs = querySnapshot.docs;

      for (let userDoc of docs) {
        let userIssuedBooks = await userDoc.ref
          .collection('issued_books')
          .get();

        for (let userIssuedBook of userIssuedBooks.docs) {
          totalFine += calculateFine(userIssuedBook.get('dueAt'));
        }

        issuedBooksCount += userIssuedBooks.docs.length;
      }

      dispatch(updateIssuedBooksCount(issuedBooksCount));
      dispatch(updateTotalFine(totalFine));
    });
};

export const pickImage = () => async dispatch => {
  const result = await launchImageLibrary({quality: 0.5});
  dispatch(imagePicked(result.assets[0].uri));
};

export default librarianSlice.reducer;
