import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  alert: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: {},
      };
    default:
      return state;
  }
};
