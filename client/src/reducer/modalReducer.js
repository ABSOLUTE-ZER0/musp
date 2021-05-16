import { ADD_POST_MODAL , REMOVE_MODAL } from "../actions/types";

const initialState = {
  addPostModal: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_MODAL:
      return {
        ...state,
        addPostModal: true,
      };
    case REMOVE_MODAL:
      return {
        ...state,
        addPostModal: false
      };
    default:
      return state;
  }
};
