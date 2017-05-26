/**
 * Created by warren on 1/24/17.
 */
import NodeNotFoundError from '../errors/nodeNotFoundError';
import NetworkError from '../errors/networkError';
import {url} from '../vars'

export default function getNodeInfo(nodeId) {

  return fetch(url + '/get-node-info', {method: 'POST', body: JSON.stringify({nodeId})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch get-node-url', res)
      }
    })
    .then((body) => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetNodeInfoSuccessful') {
          return resBody
        } else {
          throw new NodeNotFoundError('NodeId not found: ' + nodeId, resBody)
        }
      }
    )
};