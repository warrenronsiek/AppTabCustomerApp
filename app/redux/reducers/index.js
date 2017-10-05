/**
 * Created by warren on 1/17/17.
 */
import {LOGOUT} from '../actions/drawerActions'
import {combineReducers} from 'redux';
import {auth, loginParams, loginState, stripeToken, deviceToken} from './loginReducer'
import {registerParams, registerState, confirmationCode} from './registerReducer'
import {nodes, activeNode} from './nodeReducer'
import {menu, menuQueryStatus, activeMenuItem} from './menuReducer'
import {cart, additionalCosts, cartStatus, oneClickBuyItem, numberOfCartItems} from './cartReducer'
import {creditCard, ccTokens, ccTokenApiQueried, paymentStatus, creditCardTokenizing, defaultCardExists} from './creditCardReducer'
import {passwordResetData, passwordResetStatus} from './passwordResetReducer'
import {transactions} from "./transactionReducer"

const appReducer = combineReducers({
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
  cartStatus,
  stripeToken,
  deviceToken,
  creditCard,
  ccTokens,
  ccTokenApiQueried,
  additionalCosts,
  paymentStatus,
  creditCardTokenizing,
  confirmationCode,
  passwordResetData,
  passwordResetStatus,
  defaultCardExists,
  oneClickBuyItem,
  transactions,
  activeMenuItem,
  numberOfCartItems
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {}
  }

  return appReducer(state, action)
};

export default rootReducer