/**
 * Created by warren on 1/28/17.
 */
import requester from './requester'

// call with object of shape {nodeId, userName}
export default requester('/service-request', 'ServiceRequestSuccessful', 'Service request unsuccessful')