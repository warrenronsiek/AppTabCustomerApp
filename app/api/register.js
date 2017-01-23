/**
 * Created by warren on 1/20/17.
 */
import NetworkError from '../errors/networkError';


export default function registrationRequest(email, name, password) {
  const url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/register';

  return fetch(url, {method: 'POST', body: JSON.stringify({password, name, email})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch retUrl', 'api/login', 17)
      }
    })
    .then((body) => {
        const resBody = JSON.parse(body);
        switch (resBody.errorMessage) {
          case undefined:
            return resBody;
          default:
            console.log(resBody)
        }
      }
    )
};