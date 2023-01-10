import {createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {formatDate} from '../../date_formatter';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    booksStatus: 'loading',
    reservedBooksStatus: 'loading',
    issuedBooksStatus: 'loading',
    books: undefined,
    reservedBooks: undefined,
    issuedBooks: undefined,
    reserving: false,
    searchQuery: '',
    searchedBooks: undefined,
  },
  reducers: {
    booksLoaded: (state, action) => {
      state.booksStatus = 'loaded';
      state.books = action.payload;
    },
    toggleReserving: (state, action) => {
      state.reserving = action.payload;
    },
    reservedBooksLoaded: (state, action) => {
      state.reservedBooksStatus = 'loaded';
      state.reservedBooks = action.payload;
    },
    issuedBooksLoaded: (state, action) => {
      state.issuedBooksStatus = 'loaded';
      state.issuedBooks = action.payload;
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
  toggleReserving,
  searchBooks,
} = memberSlice.actions;

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
    .collection(`reserved_books/${auth().currentUser.uid}/reserved_books`)
    .onSnapshot(async querySnapshot => {
      let reservedBooks = [];

      let docs = querySnapshot.docs;

      for (let doc of docs) {
        let book = await firestore().collection('books').doc(doc.id).get();

        reservedBooks.push({
          bookId: doc.id,
          name: book.get('name'),
          author: book.get('author'),
          description: book.get('description'),
          image: book.get('image'),
          reservedAt: formatDate(doc.get('reservedAt')),
        });
      }

      dispatch(reservedBooksLoaded(reservedBooks));
    });
};

export const fetchIssuedBooks = () => async dispatch => {
  firestore()
    .collection('issued_books')
    .doc(auth().currentUser.uid)
    .collection('issued_books')
    .onSnapshot(async querySnapshot => {
      let issuedBooks = [];

      let docs = querySnapshot.docs;
      for (let doc of docs) {
        let book = await firestore().collection('books').doc(doc.id).get();

        issuedBooks.push({
          bookId: book.bookId,
          name: book.get('name'),
          author: book.get('author'),
          description: book.get('description'),
          image: book.get('image'),
          issuedAt: formatDate(doc.get('issuedAt')),
          dueAt: formatDate(doc.get('dueAt')),
          fine: calculateFine(doc.get('dueAt')),
        });
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

export const reserveBook = book => async dispatch => {
  dispatch(toggleReserving(true));

  dispatch(fetchReservedBooks());

  await firestore()
    .collection('reserved_books')
    .doc(auth().currentUser.uid)
    .set({
      uid: auth().currentUser.uid,
    });

  await firestore()
    .collection('reserved_books')
    .doc(auth().currentUser.uid)
    .collection('reserved_books')
    .doc(book.bookId)
    .set({
      reservedAt: Date.now(),
    });

  dispatch(toggleReserving(false));
};

export const cancelBookReservation = bookId => async dispatch => {
  firestore()
    .collection('reserved_books')
    .doc(auth().currentUser.uid)
    .collection('reserved_books')
    .doc(bookId)
    .delete();
};

export default memberSlice.reducer;
