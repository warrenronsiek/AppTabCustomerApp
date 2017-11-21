import requester from './requester'
// invoke with {customerId, cardId}
export default requester('/delete-credit-card', 'DeleteCardSuccessful', 'DeleteCardFailure')