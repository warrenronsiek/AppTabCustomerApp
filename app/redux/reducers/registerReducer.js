/**
 * Created by warren on 1/22/17.
 */

import {
  UPDATE_PASSWORD,
  UPDATE_EMAIL,
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_NAME,
  NETWORK_ERROR,
  USER_EXISTS_ERROR,
  UNKNOWN_ERROR,
  REGISTERING,
  REGISTERING_FINISHED,
  CLEAR_ERRORS,
  UPDATE_PHONE_NUMBER,
  UPDATE_CONFIRMATION_CODE,
  CONFIRMATION_CODE_PROCESSING,
  CONFIRMATION_CODE_PROCESSING_FINISHED
} from '../actions/registerActions';


export const registerParams = (state = {
  name: 'Warren',
  email: 'warren@apptab.io',
  phoneNumber: '(510) 883-4346',
  password: 'P@33word',
  confirmPassword: 'P@33word'
}, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {...state, name: action.name};
    case UPDATE_EMAIL:
      return {...state, email: action.email};
    case UPDATE_CONFIRM_PASSWORD:
      return {...state, confirmPassword: action.confirmPassword};
    case UPDATE_PASSWORD:
      return {...state, password: action.password};
    case UPDATE_PHONE_NUMBER:
      console.log(action);
      return {...state, phoneNumber: action.phoneNumber};
    default:
      return state
  }
};

export const registerState = (state = {}, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return {...state, networkError: true};
    case USER_EXISTS_ERROR:
      return {...state, userExistsError: true};
    case UNKNOWN_ERROR:
      return {...state, unknownError: true};
    case REGISTERING:
      return {...state, registering: true};
    case REGISTERING_FINISHED:
      return {...state, registering: false};
    case CLEAR_ERRORS:
      return {...state, networkError: false, userExistsError: false, unknownError: false};
    case CONFIRMATION_CODE_PROCESSING:
      return {...state, confirmationCodeProcessing: true};
    case CONFIRMATION_CODE_PROCESSING_FINISHED:
      return {...state, confirmationCodeProcessing: false};
    default:
      return state
  }
};

export const confirmationCode = (state = "", action) => {
  switch (action.type) {
    case UPDATE_CONFIRMATION_CODE:
      return action.confirmationCode;
    default:
      return state
  }
};