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
  formsIsLoading: false,
  formIsLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FORMS:
    case FILTER_FORM:
      return {
        ...state,
        forms: null,
        form:  null,
        formsIsLoading: true,
      };
      case LOAD_FORM:
        return {
          ...state,
          form:  null,
          formIsLoading: true,
        };
    case FORMS_LOADED:
      return {
        ...state,
        formsIsLoading: false,
        form: null,
        forms: action.payload,
      };
    case FORM_LOADED:
      return {
        ...state,
        formIsLoading: false,
        form: action.payload,
      };
    case ADD_FORM:
    case FORM_ADDED:
      return{
        ...state,
      };
    case FORM_ADDED_FAIL:
    case FORM_LOADING_FAIL:
      return {
        ...state,
        form: null,
      };
    default:
      return state;
  }
};
