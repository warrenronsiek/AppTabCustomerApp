/**
 * Created by warren on 6/26/17.
 */
import requester from './requester'
import WrongCodeError from '../errors/wrongCodeError'
import UnknownError from '../errors/unknownError'
import logger from './loggingApi'

const errorHandler = (resBody) => {
  switch (resBody.code) {
    case 'CodeMismatchException':
      throw new WrongCodeError('EnteredWrongCode', resBody);
      break;
    default:
      logger('/reset-password', resBody, 'resetPassword.js');
      throw new UnknownError('PasswordResetUnknownError', resBody);
      break;
  }
};

// invoke with {confirmationCode, password, phoneNumber}
export default requester('/reset-password', 'PasswordResetSuccessful', 'PasswordResetFailed', null, false, errorHandler)