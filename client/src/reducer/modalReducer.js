import {
  ADD_POST_MODAL,
  REMOVE_MODAL,
  LIBRARY_SEARCH_MODAL,
  BORROW_MODAL
} from "../actions/types";

const initialState = {
  addPostModal: false,
  librarySearchModal: false,
  borrow: null
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
        case BORROW_MODAL:
          return {
            ...state,
            borrow: action.payload,
          };
    case REMOVE_MODAL:
      return {
        ...state,
        librarySearchModal: false,
        addPostModal: false,
        borrow: null,
      };
    default:
      return state;
  }
};
