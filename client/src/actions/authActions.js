import {
  ADD_USER,
  USER_LOADED,
  LOAD_USER,
  LOGIN_USER,
  LOGIN_FAIL,
  ADD_USER_FAIL,
  VERIFY_USER,
  VERIFY_USER_FAIL,
  AUTH_ERROR,
  SET_ALERT,
  FORGOT_PASSWORD_FAIL,
  LOGOUT_SUCCESS,
  SET_USERS_FAIL,
  SET_USERS,
  USERS_LOADED
} from "../actions/types";

import { createBrowserHistory } from "history";
import API from "../api";

const history = createBrowserHistory({
  forceRefresh: true,
});

export const addUser = (userData) => async (dispatch) => {
  try {
    const res = await API.post("/api/user", userData);
    if (res.data.errors) {
      return res.data;
    }
    localStorage.setItem("token", res.data["token"]);
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    const token = localStorage.getItem("token");

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const verify = await API.post("/api/user/verify", null, config);

    if (verify.data.errors) {
      dispatch({
        type: SET_ALERT,
        payload: { msg: verify.data.errors[0].msg, type: "warning" },
      });
    }
    history.push("/");
    return res;
  } catch (error) {
    dispatch({
      type: ADD_USER_FAIL,
      payload: error,
    });
  }
};

export const addUserFail = (userData) => async (dispatch) => {
  dispatch({
    type: ADD_USER_FAIL,
    payload: userData,
  });
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await API.post("/api/auth", userData);
    if (res.data.errors) {
      return res.data;
    }
    localStorage.setItem("token", res.data["token"]);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    history.push("/");
    return res;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await API.post("/api/auth/forgot", { email });
    if (res.data.errors) {
      return res.data;
    }

    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: res.data,
    });

    return res;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const resetPassword = (id, password) => async (dispatch) => {
  try {
    const res = await API.post(`/api/auth/forgot/${id}`, { password });
    if (res.data.errors) {
      return res.data;
    }

    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: res.data,
    });

    history.push("/");
    return res;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const loginFail = (userData) => async (dispatch) => {
  dispatch({
    type: LOGIN_FAIL,
    payload: userData,
  });
};

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_USER });

    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.get("/api/auth", config);

    localStorage.setItem("token", token);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    if (res.data.errors || res.data.token !== token) {
      return dispatch({
        type: AUTH_ERROR,
        payload: res.data.errors,
      });
    }

    if (!res.data.verified) {
      history.push("/verify");
      return dispatch({
        type: VERIFY_USER_FAIL,
      });
    } else {
      dispatch({
        type: VERIFY_USER,
      });
      return res.data;
    }
  } catch (error) {}
};

export const userVerified = (userdata) => async (dispatch) => {
  try {
    if (userdata) {
      dispatch({
        type: VERIFY_USER,
      });
    } else {
      dispatch({
        type: VERIFY_USER_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: VERIFY_USER_FAIL,
      payload: error,
    });
  }
};

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.get(`/api/user/${id}`, config);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const checkAuth = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    if (!token) {
      return "auth";
    } else {
      const config = {
        headers: {
          "Content-type": "Application/json",
        },
      };

      if (token) {
        config.headers["x-auth-token"] = token;
      }

      const res = await API.get("/api/auth", config);

      if (res.data.errors || res.data.token !== token) {
        return "auth";
      }

      if (!res.data.verified) {
        return "verify";
      } else {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
        return "clear";
      }
    }
  } catch (error) {
    return "auth";
  }
};

export const setOnline = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.get("/api/auth", config);

    if (res.data.token === token && res.data.checkOnline) {
      await API.get(`/api/auth/online`, config);
    }

    return res.data.token;
  } catch (error) {
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    await API.get(`/api/auth/logout`, config);

    checkAuth();

    history.push("/");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
  }
};

export const updateUser = (userdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    const token = localStorage.getItem("token");

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.post(
      "/api/user/update/userdata",
      { userdata },
      config
    );

    if (res.data === "user updated") {
      history.go(0);
    }
    return res;
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: { error, type: "warning" },
    });
  }
};

export const updatePassword = (userdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    const token = localStorage.getItem("token");

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.post(
      "/api/user/update/password",
      { userdata },
      config
    );

    if (res.data === "password updated") {
      history.go(0);
    }
    return res;
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: { error, type: "warning" },
    });
  }
};

export const setUsers = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_USERS,
    });
    dispatch({
      type: USERS_LOADED,
      payload: userData,
    });
    return userData;
  } catch (error) {
    dispatch({
      type: SET_USERS_FAIL,
      payload: error,
    });
  }
};