/**
 * Created by warren on 1/22/17.
 */

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const updateEmail = (email) => {
  return {type: UPDATE_EMAIL, email}
};

export const UPDATE_PHONE_NUMBER = 'UPDATE_PHONE_NUMBER';
export const updatePhoneNumber = (phoneNumber) => {
  return {type: UPDATE_PHONE_NUMBER, phoneNumber}
};

export const UPDATE_NAME = 'UPDATE_NAME';
export const updateName = (name) => {
  return {type: UPDATE_NAME, name}
};

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const updatePassword = (password) => {
  return {type: UPDATE_PASSWORD, password}
};

export const UPDATE_CONFIRM_PASSWORD = 'UPDATE_CONFIRM_PASSWORD';
export const updateConfirmPassword = (confirmPassword) => {
  return {type: UPDATE_CONFIRM_PASSWORD, confirmPassword}
};

export const NETWORK_ERROR = 'NETWORK_ERROR';
export const networkError = () => {
  return {type: NETWORK_ERROR}
};

export const USER_EXISTS_ERROR = 'USER_EXISTS_ERROR';
export const userExistsError = () => {
  return {type: USER_EXISTS_ERROR}
};

export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const unknownError = () => {
  return {type: UNKNOWN_ERROR}
};

export const REGISTERING = 'REGISTERING';
export const registering = () => {
  return {type: REGISTERING}
};

export const REGISTERING_FINISHED = 'REGISTERING_FINISHED';
export const registeringFinished = () => {
  return {type: REGISTERING_FINISHED, }
};

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const clearErrors = () => {
  return {type: CLEAR_ERRORS, }
};

export const UPDATE_CONFIRMATION_CODE = 'UPDATE_CONFIRMATION_CODE';
export const updateConfirmationCode = (confirmationCode) => {
  return {type: UPDATE_CONFIRMATION_CODE, confirmationCode}
};

export const CONFIRMATION_CODE_PROCESSING = 'CONFIRMATION_CODE_PROCESSING';
export const confirmationCodeProcessing = () => {
  return {type: CONFIRMATION_CODE_PROCESSING, }
};

export const CONFIRMATION_CODE_PROCESSING_FINISHED = 'CONFIRMATION_CODE_PROCESSING_FINISHED';
export const confirmationCodeProcessingFinished = () => {
  return {type: CONFIRMATION_CODE_PROCESSING_FINISHED, }
};

export const WRONG_CONFIRMATION_CODE = 'WRONG_CONFIRMATION_CODE';
export const wrongConfirmationCode = () => {
  return {type: WRONG_CONFIRMATION_CODE, }
};


