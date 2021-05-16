import {
  LOAD_FORMS,
  FILTER_FORM,
  ADD_FORM,
  LOAD_FORM,
  FORMS_LOADED,
  FORM_LOADED,
  FORM_ADDED,
  FORM_ADDED_FAIL,
  FORM_LOADING_FAIL,
  POST_COMMENT,
  POST_COMMENT_FAIL,
  COMMENT_ADDED,
} from "../actions/types";

import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});

export const loadForms = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_FORMS });

    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.get("/post", config);

    dispatch({
      type: FORMS_LOADED,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const filterForm = (filters) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILTER_FORM });

    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.post("/post/filter", filters, config);

    dispatch({
      type: FORMS_LOADED,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const addForm = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_FORM });

    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.post("/post", formData, config);
    if (res.data.errors) {
      dispatch({
        type: FORM_ADDED_FAIL
      });
      return res.data;
    }
    dispatch({
      type: FORM_ADDED,
      payload: res.data,
    });
    history.push("/")
    return res;
  } catch (error) {
    dispatch({
      type: FORM_ADDED_FAIL
    });
  }
};



export const loadForm = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_FORM });

    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.get(`/post/${id}`, config);

    dispatch({
      type: FORM_LOADED,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: FORM_LOADING_FAIL
    });
  }
};


export const setForms = (form) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_FORMS });

    dispatch({
      type: FORMS_LOADED,
      payload: form,
    });
  } catch (error) {
    dispatch({
      type: FORM_LOADING_FAIL
    });
  }
};


export const postComment = (comment , id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_COMMENT });

    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.post(`/post/${id}`, comment={comment}, config);

    dispatch({
      type: COMMENT_ADDED,
      payload: res.data,
    });

    history.push(`/post/${id}`)

    return res;
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL
    });
  }
};


export const upvotePost = (id) => async (dispatch, getState) => {
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

    const res = await axios.post(`/post/upvote`, id={id}, config);

    return res;
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL
    });
  }
};

export const favouritePost = (id) => async (dispatch, getState) => {
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

    const res = await axios.post(`/post/favourite`, id={id}, config);

    return res;
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL
    });
  }
};


export const getfavouritePost = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_FORMS });
    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.get(`/post/favourite`, config);

    return res;
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL
    });
  }
};



export const searchPost = (filter , type) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_FORMS });
    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await axios.post(`/post/search`, {filter,type},config);

    return res;
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL
    });
  }
};