/**
 * Created by warren on 6/20/17.
 */

import passwordResetActions from '../actions/passwordResetActions'
import {handleActions} from 'redux-actions'

const passwordResetData = handleActions({
  [passwordResetActions.update.password]: (state, action) => ({...state, password: action.payload}),
  [passwordResetActions.update.code]: (state, action) => ({...state, code: action.payload}),
  [passwordResetActions.update.userName]: (state, action) => ({...state, code: action.payload})
}, {});

const passwordResetStatus = handleActions({
  [passwordResetActions.complete]: (state, action) => ({...state, complete: true, error: false, processing: false}),
  [passwordResetActions.processing]: (state, action) => ({...state, processing: true, error: false}),
  [passwordResetActions.error]: (state, action) => ({...state, error: true, processing: false})
}, {});

export {passwordResetStatus, passwordResetData}