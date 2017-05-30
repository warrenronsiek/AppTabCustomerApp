/**
 * Created by warren on 1/20/17.
 */
import NetworkError from '../errors/networkError'
import UserExistsError from '../errors/userExistsError'
import UnknownError from '../errors/unknownError'
import {url} from '../vars'
import logger from './loggingApi'

export default function registerRequest(email, name, password) {

  return fetch(url + '/register', {method: 'POST', body: JSON.stringify({password, name, email})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        logger('/register failed', res, 'registerApi.js');
        throw new NetworkError('failed to fetch retUrl', res)
      }
    })
    .then(body => {
        const resBody = JSON.parse(body);
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
      }
    )
};