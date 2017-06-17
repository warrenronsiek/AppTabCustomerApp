/**
 * Created by warren on 1/20/17.
 */
import UserExistsError from '../errors/userExistsError'
import UnknownError from '../errors/unknownError'
import logger from './loggingApi'
import requester from './requester'

const registerErrorProcessor = (resBody) => {
  switch (resBody.code) {
    case undefined:
      return resBody;
    case 'UsernameExistsException':
      console.log('throwing user exists');
      throw new UserExistsError(resBody);
      break;
    default:
      logger('/register wrong response', resBody, 'registerApi.js');
      throw new UnknownError('unknown registration error', resBody)
  }
};

// invoke with object {email, name, password, phoneNumber, deviceToken}
export default requester('/register', 'UserRegistrationSuccessful', 'RegistrationFailed', null, false, registerErrorProcessor)
