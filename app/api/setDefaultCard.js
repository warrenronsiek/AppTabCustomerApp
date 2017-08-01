import requester from './requester'

//invoke with {customerId, cardId, currentDefaultCard}
export default requester('/set-default-card', 'SetDefaultCardSuccessful', 'set default card failed')