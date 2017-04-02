/**
 * Created by warren on 4/1/17.
 */
import ccActions from '../actions/creditCardActions'
import {handleActions} from 'redux-actions'
import * as _ from 'lodash'

const creditCard = handleActions({
  [ccActions.real.update.number]: (state, action) => ({...state, cardNumber: action.cardNumber}),
  [ccActions.real.update.exp_year]: (state, action) => ({...state, exp_year: action.exp_year}),
  [ccActions.real.update.exp_month]: (state, action) => ({...state, exp_month: action.exp_month}),
  [ccActions.real.update.ccv]: (state, action) => ({...state, ccv: action.ccv}),
  [ccActions.real.update.zip]: (state, action) => ({...state, zip: action.zip}),
  [ccActions.real.wipe]: (state, action) => ({})
}, {});

const ccTokens = handleActions({
  [ccActions.token.add]: (state, action) => [...state, {
    ccToken: action.ccToken,
    brand: action.brand,
    last4: action.last4,
    exp_month: action.exp_month,
    exp_year: action.exp_year,
    active: false
  }],
  [ccActions.token.delete]: (state, action) => state.filter(item => item.ccToken !== action.ccToken),
  [ccActions.token.setActive]: (state, action) => [...state.filter(item => item.ccToken !== action.ccToken).map(item => item.active = false), {
    ...state.filter(item => item.ccToken !== action.ccToken)[0], active: true
  }]
}, [{ccToken: 'asdf', brand: 'visa', last4: '1234', active: false}, {ccToken: 'fdsa', brand: 'amex', last4:'4321', active: true}]);

export {creditCard, ccTokens}
