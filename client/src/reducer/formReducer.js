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
} from "../actions/types";

const initialState = {
  form: null,
  forms: null,
  isLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FORMS:
    case FILTER_FORM:
    case LOAD_FORM:
      return {
        ...state,
        forms: null,
        form:  null,
        isLoading: true,
      };
    case FORMS_LOADED:
      return {
        ...state,
        isLoading: false,
        form: null,
        forms: action.payload,
      };
    case FORM_LOADED:
      return {
        ...state,
        form: action.payload,
      };
    case ADD_FORM:
    case FORM_ADDED:
      return{
        ...state,
        isLoading: false
      };
    case FORM_ADDED_FAIL:
    case FORM_LOADING_FAIL:
      return {
        ...state,
        form: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
