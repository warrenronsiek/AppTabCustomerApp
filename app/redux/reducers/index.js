/**
 * Created by warren on 1/17/17.
 */
import {combineReducers} from 'redux';
import {auth, loginParams, loginState} from './loginReducer'
import {registerParams, registerState} from './registerReducer'
import {nodes, activeNode} from './nodeReducer'
import {menu, menuQueryStatus} from './menuReducer'

export default combineReducers({
  auth, loginParams, loginState, registerParams, registerState, nodes, activeNode, menu,
  menuQueryStatus
});