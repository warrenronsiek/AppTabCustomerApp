/**
 * Created by warren on 1/24/17.
 */
import requester from './requester'

// invoke with object of shape {nodeId}
export default requester('/get-node-info', 'GetNodeInfoSuccessful', 'Get node failure', null, false)
