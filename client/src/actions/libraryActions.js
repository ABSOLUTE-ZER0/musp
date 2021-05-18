import { GET_BOOKS_FAIL, GET_BOOKS, BOOKS_LOADED } from "../actions/types";

import API from "../api";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});

export const openSearchPage = (search, page=0) => () =>
  history.push(`/library/search/${search}/${page}`);

export const searchBooks =
  (search, page) =>
  async (dispatch) => {
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

      const res = await API.post("/library/search", { search, page }, config);

      if (res && res.data.msg) {
        dispatch({
          type: GET_BOOKS_FAIL,
          payload: res.data
        });
        return res.data;
      }

      dispatch({
        type: BOOKS_LOADED,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: GET_BOOKS_FAIL,
        payload: error
      });
        return error;
    }
  };