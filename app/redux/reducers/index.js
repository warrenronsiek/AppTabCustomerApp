/**
 * Created by warren on 1/17/17.
 */
import {LOGOUT} from '../actions/drawerActions'
import {combineReducers} from 'redux';
import {auth, loginParams, loginState, stripeToken, deviceToken} from './loginReducer'
import {registerParams, registerState, confirmationCode} from './registerReducer'
import {beacons, activeBeacon} from './beaconReducer'
import {activeNode, nodes} from './nodeReducer'
import {menu, menuQueryStatus, activeMenuItem} from './menuReducer'
import {cart, cartStatus} from './cartReducer'
import {creditCard, ccTokens, ccTokenApiQueried, paymentStatus, creditCardTokenizing, defaultCardExists} from './creditCardReducer'
import {passwordResetData, passwordResetStatus} from './passwordResetReducer'
import {transactions, transactionCount} from "./transactionReducer"
import {activeVenue, venues, bluetoothReconstruction} from './venueReducer'

const appReducer = combineReducers({
  auth,
  loginParams,
  loginState,
  registerParams,
  registerState,
  beacons,
  activeBeacon,
  activeNode,
  nodes,
  menu,
  menuQueryStatus,
  cart,
  cartStatus,
  stripeToken,
  deviceToken,
  creditCard,
  ccTokens,
  ccTokenApiQueried,
  paymentStatus,
  creditCardTokenizing,
  confirmationCode,
  passwordResetData,
  passwordResetStatus,
  defaultCardExists,
  transactionCount,
  transactions,
  activeMenuItem,
  activeVenue,
  venues,
  bluetoothReconstruction
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {}
  }

  return appReducer(state, action)
};

export default rootReducer