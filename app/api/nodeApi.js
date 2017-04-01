/**
 * Created by warren on 1/24/17.
 */
import NodeNotFoundError from '../errors/nodeNotFoundError';
import NetworkError from '../errors/networkError';

export default function getNodeInfo(nodeId) {
  const loginUrl = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/get-node-info';

  return fetch(loginUrl, {method: 'POST', body: JSON.stringify({nodeId})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch loginUrl', 'api/login', 17)
      }
    })
    .then((body) => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetNodeInfoSuccessful') {
          return resBody
        } else {
          throw new NodeNotFoundError('NodeId not in Database: ' + nodeId)
        }
      }
    )
}
;