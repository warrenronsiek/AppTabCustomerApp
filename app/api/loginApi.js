/**
 * Created by warren on 1/18/17.
 */
import decode from 'jwt-decode'
import NetworkError from '../errors/networkError'
import ValidationError from '../errors/validationError'
import UnknownError from '../errors/unknownError'
import {url} from '../vars'

export default function loginRequest(email, password) {

  return fetch(url + '/login', {method: 'POST', body: JSON.stringify({password: password, email: email})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch loginUrl', 'api/login', 17)
      }
    })
    .then(body => {
        const resBody = JSON.parse(body);
        switch (resBody.code) {
          case undefined:
            const idVals = decode(resBody['authParameters']['IdToken']);
            return {
              accessToken: resBody['authParameters']['AccessToken'],
              idToken: resBody['authParameters']['IdToken'],
              refreshToken: resBody['authParameters']['RefreshToken'],
              userName: idVals['name'],
              clientId: idVals['sub']
            };
          case 'UserNotFoundException':
            throw new ValidationError('failed to provide correct credentials', body);
            break;
          case 'NotAuthorizedException':
            throw new ValidationError('failed to provide correct credentials', body);
            break;
          default:
            throw new UnknownError('unknown login error', body);
        }
      }
    )
};