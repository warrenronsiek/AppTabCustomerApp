import requester from './requester'

// invoke with {amount, cardToken, stripeToken, nodeId, customerId, items, tax, tip, itemTotal, venueId}
export default requester('/open-transaction', 'TransactionStored', 'transaction not stored')