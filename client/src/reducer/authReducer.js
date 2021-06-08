import {
  ADD_USER,
  USER_LOADED,
  LOAD_USER,
  LOGIN_USER,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  ADD_USER_FAIL,
  VERIFY_USER,
  VERIFY_USER_FAIL,
  FORGOT_PASSWORD_FAIL,
  SET_USERS_FAIL,
  SET_USERS,
  USERS_LOADED,
} from "../actions/types";

const initialState = {
  user: null,
  users: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  isUsersLoading: false,
  isVerified: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case SET_USERS:
      return {
        ...state,
        isUsersLoading: false,
        users: null,
      };

    case USERS_LOADED:
      return {
        ...state,
        isUsersLoading: false,
        users: action.payload,
      };
    case ADD_USER:
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        isLoading: false,
      };
    case VERIFY_USER:
      return {
        ...state,
        isVerified: true,
      };
    case VERIFY_USER_FAIL:
      return {
        ...state,
        isVerified: false,
      };
    case SET_USERS_FAIL:
      return {
        ...state,
        isUsersLoading: false,
        users: null,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case ADD_USER_FAIL:
    case FORGOT_PASSWORD_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: null,
        isLoading: null,
      };
    default:
      return state;
  }
};
