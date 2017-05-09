/**
 * Created by warren on 1/18/17.
 */
import decode from 'jwt-decode'
import NetworkError from '../errors/networkError'
import ValidationError from '../errors/validationError'
import UnknownError from '../errors/unknownError'

export default function loginRequest(email, password) {
  const loginUrl = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/login';

  return fetch(loginUrl, {method: 'POST', body: JSON.stringify({password: password, email: email})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch loginUrl', 'api/login', 17)
      }
    })
    .then((body) => {
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
            throw new ValidationError('failed to provide correct credentials', 'api/login', 33);
            break;
          case 'NotAuthorizedException':
            throw new ValidationError('failed to provide correct credentials', 'api/login', 36);
            break;
          default:
            console.log(body);
            throw new UnknownError('unknown login error', 'api/login', 40);
        }
      }
    )
};