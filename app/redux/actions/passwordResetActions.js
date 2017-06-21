/**
 * Created by warren on 6/20/17.
 */

import {createActions} from 'redux-actions'

export default passwordResetActions = createActions({
  UPDATE: {
    PASSWORD: password => password,
    USERNAME: userName => userName,
    CODE: code => code
  },
  PROCESSING: bool => bool,
  COMPLETE: bool => bool,
  ERROR: bool => bool
})