import requester from './requester'

const processor = err => {throw new Error(JSON.stringify(err))};
// invoke with {amount, cardToken, stripeToken, nodeId, customerId, items, tax, tip, itemTotal, venueId}
export default requester('/open-transaction', 'TransactionStored', 'transaction not stored', null, true, processor)