/**
 * Created by warren on 1/20/17.
 */
import UserExistsError from '../errors/userExistsError'
import UnknownError from '../errors/unknownError'
import logger from './loggingApi'
import requester from './requester'

const registerProcessor = (resBody) => {
  switch (resBody.code) {
    case undefined:
      return resBody;
    case 'UsernameExistsException':
      throw new UserExistsError(body);
      break;
    default:
      logger('/register wrong response', resBody, 'registerApi.js');
      throw new UnknownError('unknown registration error', body)
  }
};

// invoke with object {email, name, password}
export default requester('/register', 'UserRegistrationSuccessful', 'RegistrationFailed', registerProcessor, false)
