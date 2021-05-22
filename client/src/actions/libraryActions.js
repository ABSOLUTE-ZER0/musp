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
      duration: 14,
    };

    const res = await API.post(`/api/library/borrow/${id}`, headers, config);

    if (res && res.data.msg) {
      return res.data;
    }
  } catch (error) {
    return error;
  }
};

export const lendBook = (id, name, bookName) => async () => {
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

    const body = {
      id,
      bookName,
      type: "request",
      message: `Hey there! I'm ${name}, if you are not using the book "${bookName}" at the moment, would you lend me that book for a day or two!`,
    };
    
    await API.post(`/api/user/message`, body, config);
    
  } catch (error) {
    return error;
  }
};


export const replyLendBook = (id, name, bookName, responce) => async () => {
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

    let body = {}

    if(responce === "REJECTED"){
      body = {
        id,
        bookName,
        type: "responce",
        message:  `Your request to lend the book "${bookName}" from  ${name} was REJECTED.`,
      };
    } else{
      body = {
        id,
        type: "responce",
        bookName,
        message:  `Your request to lend the book "${bookName}" from  ${name} was ACCEPTED. Please contact ${name} in-person and collect your book`,
      };
    }
    
    const res = await API.post(`/api/user/message`, body, config);
    console.log(res,body);
  } catch (error) {
    return error;
  }
};



export const readMessage = (id) => async () => {
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

    await API.post(`/api/user/message/read/${id}`, {}, config);
  } catch (error) {
    return error;
  }
};



export const deleteMessage = (id) => async () => {
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

    
    await API.post(`/api/user/message/delete/${id}`, {}, config);
    
  } catch (error) {
    return error;
  }
};
