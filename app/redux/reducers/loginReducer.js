/**
 * Created by warren on 1/20/17.
 */
import {
  UPDATE_AUTH,
  LOGGING_IN,
  VALIDATION_ERROR,
  NETWORK_ERROR,
  UNKNOWN_ERROR,
  UPDATE_PHONE_NUMBER,
  UPDATE_PASSWORD,
  UPDATE_STRIPE_TOKEN,
  LOGIN_COMPLETE,
  CLEAR_ERRORS,
  SET_DEVICE_TOKEN
} from '../actions/loginActions';
import phoneNumberHandler from '../../common/phoneNumberHandler'
import {devData} from "../../common/devData";

export const auth = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return {
        ...state,
        accessToken: action.accessToken,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        userName: action.userName,
        customerId: action.customerId,
        updateTime: new Date()
      };
    default:
      return state;
  }
};

export const loginState = (state = {}, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return {...state, loggingIn: true};
    case VALIDATION_ERROR:
      return {...state, validationError: true};
    case NETWORK_ERROR:
      return {...state, networkError: true};
    case UNKNOWN_ERROR:
      return {...state, unknownError: true};
    case LOGIN_COMPLETE:
      return {...state, loggingIn: false};
    case CLEAR_ERRORS:
      return {...state, validationError: false, networkError: false, unknownError: false};
    default:
      return state
  }
};

export const loginParams = (state = __DEV__
                                ? {password: devData.loginParams.password, phoneNumber: devData.loginParams.phoneNumber}
                                : {password: '', phoneNumber: ''}, action) => {
  switch (action.type) {
    case UPDATE_PHONE_NUMBER:
      return {...state, phoneNumber: phoneNumberHandler(action.phoneNumber)};
    case UPDATE_PASSWORD:
      return {...state, password: action.password};
    default:
      return state;
  }
};

export const stripeToken = (state = '', action) => {
  switch (action.type) {
    case UPDATE_STRIPE_TOKEN:
      return action.token;
    default:
      return state
  }
};

export const deviceToken = (state = __DEV__ ? devData.deviceToken : {}, action) => {
  switch (action.type) {
    case SET_DEVICE_TOKEN:
      return action.deviceToken;
    default:
      return state
  }
};