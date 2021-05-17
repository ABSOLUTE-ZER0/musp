import {
  GET_BOOKS_FAIL,
  GET_BOOKS,
  BOOKS_LOADED,
} from "../actions/types";

import API from "../api";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});


export const searchBooks =
  (search, page = 0) =>
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

      const res = await API.post("/library/search", {search,page}, config);

      if (res && res.data.errors) {
        dispatch({
          type: GET_BOOKS_FAIL,
        });
        return res.data;
      }

      dispatch({
        type: BOOKS_LOADED,
        payload: res.data,
      });

      history.push("/library/search")
      console.log(res.data);
      return res.data;
    } catch (error) {
      dispatch({
        type: GET_BOOKS_FAIL,
      });
      return error;
    }
  };
