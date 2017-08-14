import {handleActions} from 'redux-actions'
import transactionActions from '../actions/trasactionActions'
import {filter} from 'lodash'

const transactions = handleActions({
  [transactionActions.update]: (state, action) => {
    let timePlaceholder = new Date(action.payload.createDate);
    timePlaceholder = new Date(timePlaceholder.getTime() + (timePlaceholder.getTimezoneOffset() * 60000));
    let amountPlaceholder = action.payload.amount.toString().split('');
    amountPlaceholder.reverse();
    amountPlaceholder.splice(2, 0, '.');
    amountPlaceholder.reverse();
    amountPlaceholder = amountPlaceholder.join('');
      return [...state.filter(item => item.transactionId !== action.payload.transactionId), {
        transactionId: action.payload.transactionId,
        data: action.payload.items,
        amount: action.payload.amount,
        displayAmount: '$' + amountPlaceholder,
        displayDate: timePlaceholder.toDateString(),
        date: action.payload.createDate}
      ]
    },
  [transactionActions.delete]: (state, action) => filter(state, [action.payload.transactionId])
}, []);

export {transactions}