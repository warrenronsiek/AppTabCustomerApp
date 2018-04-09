/**
 * Created by warren on 1/18/17.
 */
export const LOGIN = 'LOGIN';
export const login = (userName, password) => {
  return {type: LOGIN, userName, password}
};

export const LOGIN_COMPLETE = 'LOGIN_COMPLETE';
export const loginComplete = () => {
  return {type: LOGIN_COMPLETE, }
};

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const clearErrors = () => {
  return {type: CLEAR_ERRORS, }
};

export const UPDATE_AUTH = 'UPDATE_AUTH';
export const updateAuth = (accessToken, idToken, refreshToken, userName, customerId) => {
  return {type: UPDATE_AUTH, accessToken, idToken, refreshToken, userName, customerId}
};

export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const validationError = () => {
  return {type: VALIDATION_ERROR}
};

export const NETWORK_ERROR = 'NETWORK_ERROR';
export const networkError = () => {
  return {type: NETWORK_ERROR}
};

export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const unknownError = () => {
    return {type: UNKNOWN_ERROR}
};

export const LOGGING_IN = 'LOGGING_IN';
export const loggingIn = () => {
    return {type: LOGGING_IN}
};

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const updatePassword = (password) => {
    return {type: UPDATE_PASSWORD, password}
};

export const UPDATE_PHONE_NUMBER = 'UPDATE_PHONE_NUMBER';
export const updatePhoneNumber = (phoneNumber) => {
  return {type: UPDATE_PHONE_NUMBER, phoneNumber}
};

export const UPDATE_STRIPE_TOKEN = 'UPDATE_STRIPE_TOKEN';
export const updateStripeToken = (token) => {
  return {type: UPDATE_STRIPE_TOKEN, token}
};

export const SET_DEVICE_TOKEN = 'SET_DEVICE_TOKEN';
export const setDeviceToken = (deviceToken) => {
  return {type: SET_DEVICE_TOKEN, deviceToken}
};

export const LOGIN_COMPONENT_MOUNTED = 'LOGIN_COMPONENT_MOUNTED';
export const loginComponentMounted = () => {
  return {type: LOGIN_COMPONENT_MOUNTED, }
};

