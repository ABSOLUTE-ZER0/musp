import {combineReducers} from  'redux'
import authReducer from "./authReducer"
import alertReducer from "./alertReducer"
import formReducer from "./formReducer"
import modalReducer from "./modalReducer"

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  form: formReducer,
  modal: modalReducer
})