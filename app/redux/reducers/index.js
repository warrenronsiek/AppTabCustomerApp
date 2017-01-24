/**
 * Created by warren on 1/17/17.
 */
import {combineReducers} from 'redux';
import {auth, loginParams, loginState} from './loginReducer'
import {registerParams, registerState} from './registerReducer'
import {nodes, activeNode} from './nodeReducer'

export default combineReducers({auth, loginParams, loginState, registerParams, registerState, nodes, activeNode});