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
  REGISTERING
} from '../actions/register';

export const registerParams = (state = {name: 'Warren3', email: 'wronsiek@gmail.com', password: 'P@33word', confirmPassword:'P@33word'}, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {...state, name: action.name};
    case UPDATE_EMAIL:
      return {...state, email: action.email};
    case UPDATE_CONFIRM_PASSWORD:
      return {...state, confirmPassword: action.confirmPassword};
    case UPDATE_PASSWORD:
      return {...state, password: action.password};
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
    default:
      return state
  }
};