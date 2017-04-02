/**
 * Created by warren on 1/17/17.
 */
import {combineReducers} from 'redux';
import {auth, loginParams, loginState, stripeToken} from './loginReducer'
import {registerParams, registerState} from './registerReducer'
import {nodes, activeNode} from './nodeReducer'
import {menu, menuQueryStatus} from './menuReducer'
import {cart} from './cartReducer'
import {creditCard, ccTokens} from './creditCardReducer'

export default combineReducers({
  auth, loginParams, loginState, registerParams, registerState, nodes, activeNode, menu,
  menuQueryStatus, cart, stripeToken, creditCard, ccTokens
});