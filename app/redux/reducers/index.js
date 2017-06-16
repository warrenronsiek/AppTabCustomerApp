/**
 * Created by warren on 1/17/17.
 */
import {combineReducers} from 'redux';
import {auth, loginParams, loginState, stripeToken, deviceToken} from './loginReducer'
import {registerParams, registerState, confirmationCode} from './registerReducer'
import {nodes, activeNode} from './nodeReducer'
import {menu, menuQueryStatus} from './menuReducer'
import {cart, additionalCosts} from './cartReducer'
import {creditCard, ccTokens, ccTokenApiQueried, paymentStatus, creditCardTokenizing} from './creditCardReducer'

export default combineReducers({
  auth,
  loginParams,
  loginState,
  registerParams,
  registerState,
  nodes,
  activeNode,
  menu,
  menuQueryStatus,
  cart,
  stripeToken,
  deviceToken,
  creditCard,
  ccTokens,
  ccTokenApiQueried,
  additionalCosts,
  paymentStatus,
  creditCardTokenizing,
  confirmationCode
});