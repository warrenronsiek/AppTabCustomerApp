/**
 * Created by warren on 1/18/17.
 */
import decode from 'jwt-decode'
import ValidationError from '../errors/validationError'
import UnknownError from '../errors/unknownError'
import logger from './loggingApi'
import requester from './requester'

const loginProcessor = resBody => {
  const idVals = decode(resBody['authParameters']['IdToken']);
  return {
    accessToken: resBody['authParameters']['AccessToken'],
    idToken: resBody['authParameters']['IdToken'],
    refreshToken: resBody['authParameters']['RefreshToken'],
    userName: idVals['name'],
    customerId: idVals['sub']
  };
};

const errorProcessor = resBody => {
  switch (resBody.code) {
    case 'UserNotFoundException':
      throw new ValidationError('failed to provide correct credentials', body);
      break;
    case 'NotAuthorizedException':
      throw new ValidationError('failed to provide correct credentials', body);
      break;
    default:
      logger('/login unknownError', resBody, 'loginApi.js');
      throw new UnknownError('unknown login error', body);
  }
};

// invoke with {phoneNumber, password}
export default requester('/login', 'LoginSuccessful', 'login failure', loginProcessor, false, errorProcessor)
