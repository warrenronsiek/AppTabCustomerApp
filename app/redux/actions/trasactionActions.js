import {createActions} from 'redux-actions'

const transactionActions = createActions({
  UPDATE: (transactionId, amount, items, createDate) => ({transactionId, amount, items, createDate}),
  DELETE: transactionId => transactionId,
  ALERT: {
    ADD: item => item,
    CLEAR: item => item
  }
});

export default transactionActions