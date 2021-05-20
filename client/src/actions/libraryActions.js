import {
  GET_BOOKS_FAIL,
  GET_BOOKS,
  BOOKS_LOADED,
  GET_BOOK_FAIL,
  GET_BOOK,
  BOOK_LOADED,
} from "../actions/types";

import API from "../api";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});

export const openSearchPage =
  (search, page = 0) =>
  () =>
    history.push(`/library/search/${search}/${page}`);

export const searchBooks = (search, page) => async (dispatch) => {
  try {
    dispatch({ type: GET_BOOKS });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.post("/api/library/search", { search, page }, config);

    if (res && res.data.msg) {
      dispatch({
        type: GET_BOOKS_FAIL,
        payload: res.data,
      });
      return res.data;
    }

    dispatch({
      type: BOOKS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKS_FAIL,
      payload: error,
    });
    return error;
  }
};

export const getBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BOOK });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.get(`/api/library/borrow/${id}`, config);

    if (res && res.data.msg) {
      dispatch({
        type: GET_BOOK_FAIL,
        payload: res.data,
      });
      return res.data;
    }

    dispatch({
      type: BOOK_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOK_FAIL,
      payload: error,
    });
    return error;
  }
};

export const borrowBook = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const headers = {
      duration: 14
    }

    const res = await API.post(
      `/api/library/borrow/${id}`,
      headers,
      config
    );

    if (res && res.data.msg) {
      return res.data;
    }


  } catch (error) {
    return error;
  }
};
