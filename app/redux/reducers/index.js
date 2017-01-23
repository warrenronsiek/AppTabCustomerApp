/**
 * Created by warren on 1/17/17.
 */
import {combineReducers} from 'redux';
import {auth, loginParams, loginState} from './login'
import {registerParams, registerState} from './register'

export default combineReducers({auth, loginParams, loginState, registerParams, registerState});