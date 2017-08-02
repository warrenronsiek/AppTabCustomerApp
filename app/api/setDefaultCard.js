import requester from './requester'

//invoke with {customerId, newDefaultCardId, oldDefaultCardId}
export default requester('/set-default-card', 'SetDefaultCardSuccessful', 'set default card failed')