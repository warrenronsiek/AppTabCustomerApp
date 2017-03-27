/**
 * Created by warren on 1/18/17.
 */
export const LOGIN = 'LOGIN';
export const login = (userName, password) => {
  return {type: LOGIN, userName, password}
};

export const UPDATE_AUTH = 'UPDATE_AUTH';
export const updateAuth = (accessToken, idToken, refreshToken, userName, clientId) => {
  return {type: UPDATE_AUTH, accessToken, idToken, refreshToken, userName, clientId}
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

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const updateEmail = (email) => {
    return {type: UPDATE_EMAIL, email}
};

export const UPDATE_STRIPE_TOKEN = 'UPDATE_STRIPE_TOKEN';
export const updateStripeToken = (token) => {
  return {type: UPDATE_STRIPE_TOKEN, token}
};

