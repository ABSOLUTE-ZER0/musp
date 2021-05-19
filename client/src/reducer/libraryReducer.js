import {
  GET_BOOKS_FAIL,
  GET_BOOKS,
  BOOKS_LOADED,
  GET_BOOK_FAIL,
  GET_BOOK,
  BOOK_LOADED,
} from "../actions/types";

const initialState = {
  books: null,
  totalBooks: null,
  book: null,
  booksIsLoading: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LOADED:
      return {
        ...state,
        books: action.payload.items,
        totalBooks: action.payload.totalItems,
        booksIsLoading: false,
      };
    case GET_BOOKS:
      return {
        ...state,
        books: null,
        booksIsLoading: true,
      };
    case GET_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload,
        books: null,
      };
    case BOOK_LOADED:
      return {
        ...state,
        book: action.payload,
      };
    case GET_BOOK:
      return {
        ...state,
        book: null,
      };
    case GET_BOOK_FAIL:
      return {
        ...state,
        book: null,
      };
    default:
      return state;
  }
};
