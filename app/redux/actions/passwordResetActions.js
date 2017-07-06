/**
 * Created by warren on 6/20/17.
 */

import {createActions} from 'redux-actions'

export default passwordResetActions = createActions({
  UPDATE: {
    PASSWORD: password => password,
    PHONE_NUMBER: phoneNumber => phoneNumber,
    CODE: code => code,
    CONFIRM_PASSWORD: password => password
  },
  STAGE: {
    PHONE_NUMBER: bool => bool,
    CODE_PASSWORD: bool => bool
  },
  PROCESSING: bool => bool,
  COMPLETE: bool => bool,
  ERROR: {
    WRONG_CODE: bool => bool,
    UNKNOWN: bool => bool,
  },
  RESET_STATE: bool => bool
})