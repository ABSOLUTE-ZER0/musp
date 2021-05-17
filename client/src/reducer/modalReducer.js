import {
  ADD_POST_MODAL,
  REMOVE_MODAL,
  LIBRARY_SEARCH_MODAL,
} from "../actions/types";

const initialState = {
  addPostModal: false,
  librarySearchModal: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_MODAL:
      return {
        ...state,
        addPostModal: true,
      };
    case LIBRARY_SEARCH_MODAL:
      return {
        ...state,
        librarySearchModal: true,
      };
    case REMOVE_MODAL:
      return {
        ...state,
        librarySearchModal: false,
        addPostModal: false,
      };
    default:
      return state;
  }
};
