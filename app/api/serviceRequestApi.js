/**
 * Created by warren on 1/28/17.
 */
import NetworkError from '../errors/networkError';

export default function serviceRequest(nodeId, userName) {
  const loginUrl = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/service-request';

  return fetch(loginUrl, {method: 'POST', body: JSON.stringify({nodeId, userName})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch loginUrl', 'api/login', 17)
      }
    })
    .then((body) => {
        return JSON.parse(body);
      }
    )
};
