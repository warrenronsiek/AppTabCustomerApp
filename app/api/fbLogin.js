import requester from './requester'

//pass object of shape {customerId, deviceToken}
export default requester('/fb-login-handler', 'FbLoginComplete', 'Error in facebook login.')