import { ADD_POST_MODAL , REMOVE_MODAL , LIBRARY_SEARCH_MODAL, BORROW_MODAL } from "../actions/types";

export const showAppPostModal = () => (dispatch) => {
  dispatch({
    type: ADD_POST_MODAL
  });
};

export const showLibrarySearchModal = () => (dispatch) => {
  dispatch({
    type: LIBRARY_SEARCH_MODAL
  });
};

export const showBorrowModal = (type) => (dispatch) => {
  dispatch({
    type: BORROW_MODAL,
    payload: type
  });
};

export const removeModal = () => (dispatch) => {
  dispatch({
    type: REMOVE_MODAL
  });
};



