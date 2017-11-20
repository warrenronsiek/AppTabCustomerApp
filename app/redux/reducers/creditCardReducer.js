/**
 * Created by warren on 4/1/17.
 */
import ccActions from '../actions/creditCardActions'
import {handleActions, handleAction} from 'redux-actions'

const creditCard = handleActions({
  [ccActions.real.update.number]: (state, action) => ({...state, cardNumber: action.payload}),
  [ccActions.real.update.expYear]: (state, action) => ({...state, expYear: action.payload}),
  [ccActions.real.update.expMonth]: (state, action) => ({...state, expMonth: action.payload}),
  [ccActions.real.update.ccv]: (state, action) => ({...state, ccv: action.payload}),
  [ccActions.real.update.zip]: (state, action) => ({...state, zip: action.payload}),
  [ccActions.real.wipe]: (state, action) => ({})
}, {});

const ccTokens = handleActions({
    [ccActions.token.add]: (state, action) => [...state, {
      ccToken: action.payload.ccToken,
      brand: action.payload.brand,
      last4: action.payload.last4,
      expMonth: action.payload.exp_month,
      expYear: action.payload.exp_year,
      isSelected: action.payload.isDefault || false,
      showDeleteButton: false
    }],
    [ccActions.token.delete]: (state, action) => state.filter(item => item.ccToken !== action.ccToken),
    [ccActions.token.setSelected]: (state, action) => [
      ...state.filter(item => item.ccToken !== action.payload).map(item => ({...item, isSelected: false})),
      {...state.filter(item => item.ccToken === action.payload)[0], isSelected: true}
    ],
    [ccActions.token.toggleDeleteButton]: (state, action) => [
      ...state.filter(item => item.ccToken !== action.payload.ccToken),
      {...state.filter(item => item.ccToken === action.payload.ccToken)[0], showDeleteButton: action.payload.bool}
    ]
  }, []
);

const defaultCardExists = handleActions({
  [ccActions.token.add]: (state, action) => action.payload.isDefault || state,
  [ccActions.token.setSelected]: (state, action) => true
}, false);

const ccTokenApiQueried = handleAction(ccActions.apiQueried, {
  next: (state = false, action) => action.payload,
  throw: (state, action) => state
}, false);

const creditCardTokenizing = handleAction(ccActions.real.tokenizing, {
  next: (state = false, action) => action.payload,
  throw: (state, action) => state
}, false);

const paymentStatus = handleActions({
  [ccActions.payment.processing]: (state, action) => ({processing: true, failure: null, success: null}),
  [ccActions.payment.failure]: (state, action) => ({failure: true, success: null, processing: false}),
  [ccActions.payment.success]: (state, action) => ({success: true, failure: false, processing: false}),
  [ccActions.payment.reset]: (state, action) => ({processing: false, success: null, failure: null})
}, {processing: false, success: null, failure: null});

export {creditCard, ccTokens, ccTokenApiQueried, paymentStatus, creditCardTokenizing, defaultCardExists}
