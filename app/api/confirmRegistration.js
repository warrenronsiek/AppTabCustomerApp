/**
 * Created by warren on 6/16/17.
 */
import requester from './requester'
import WrongCodeError from '../errors/wrongCodeError'
import UnknownError from '../errors/unknownError'
import logger from './loggingApi'

const errorHandler = (res) => {
  switch (res.code) {
    case 'CodeMismatchException':
      throw new WrongCodeError(res);
    default:
      logger('/confirm-code wrong response', res, 'confirmRegistration.js');
      throw new UnknownError('unknown error in code confirmation', res)
  }
};

// invoke with {confirmationCode, phoneNumber}
export default requester('/confirm-registration', 'UserConfirmationSuccessful', 'Error Confirming User', null, false, errorHandler)