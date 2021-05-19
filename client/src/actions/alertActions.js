import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, type) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, type },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
};

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT
  });
};

