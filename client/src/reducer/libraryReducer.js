import {
  GET_BOOKS_FAIL,
  GET_BOOKS,
  BOOKS_LOADED
} from "../actions/types";

const initialState = {
  books: null,
  book: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_LOADED:
      return {
        ...state,
        books: action.payload,
      };
      case GET_BOOKS:
        return {
          ...state,
          books: null,
        };
    case GET_BOOKS_FAIL:
      return {
        books: null,
        book: null
      };
    default:
      return state;
  }
};
