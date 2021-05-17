import { ADD_POST_MODAL , REMOVE_MODAL , LIBRARY_SEARCH_MODAL } from "../actions/types";

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

export const removeModal = () => (dispatch) => {
  dispatch({
    type: REMOVE_MODAL
  });
};



