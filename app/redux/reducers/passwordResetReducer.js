/**
 * Created by warren on 6/20/17.
 */

import passwordResetActions from '../actions/passwordResetActions'
import {handleActions} from 'redux-actions'

const passwordResetData = handleActions({
  [passwordResetActions.update.password]: (state, action) => ({...state, password: action.payload}),
  [passwordResetActions.update.code]: (state, action) => ({...state, code: action.payload}),
  [passwordResetActions.update.username]: (state, action) => ({...state, userName: action.payload}),
  [passwordResetActions.resetState]: (state, action) => ({}),
}, {});

const passwordResetStatus = handleActions({
  [passwordResetActions.complete]: (state, action) => ({...state, complete: true, error: false, processing: false}),
  [passwordResetActions.processing]: (state, action) => ({...state, processing: true, error: false}),
  [passwordResetActions.error]: (state, action) => ({...state, error: true, processing: false}),
  [passwordResetActions.stage.phoneNumber]: (state, action) => ({...state, processing: false, error: false, stage: 'phoneNumber'}),
  [passwordResetActions.stage.codePassword]: (state, action) => ({...state, processing: false, error: false, stage: 'codePassword'}),
  [passwordResetActions.resetState]: (state, action) => ({stage: 'phoneNumber'})
}, {stage: 'phoneNumber'});

export {passwordResetStatus, passwordResetData}