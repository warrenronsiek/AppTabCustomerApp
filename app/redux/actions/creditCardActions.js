/**
 * Created by warren on 4/1/17.
 */
import {createActions} from 'redux-actions'
import {ccTokenApiQueried} from "../reducers/creditCardReducer";

export default ccActions = createActions({
  REAL: {
    UPDATE: {
      NUMBER: cardNumber => cardNumber,
      EXP_YEAR: year => year,
      EXP_MONTH: monthNumber => monthNumber,
      CCV: number => number,
      ZIP: number => number
    },
    WIPE: cardNumber => cardNumber,
    TOKENIZING: isTokenizing => isTokenizing
  },
  TOKEN: {
    ADD: (ccToken, last4, brand, exp_month, exp_year, isDefault) => ({ccToken, last4, brand, exp_month, exp_year, isDefault}),
    DELETE: ccToken => ccToken,
    SET_SELECTED: ccToken => ccToken,
    TOGGLE_DELETE_BUTTON: ({ccToken, bool}) => ({ccToken, bool})
  },
  API_QUERIED: bool => bool,
  PAYMENT: {
    PROCESSING: () => ({}),
    FAILURE: () => ({}),
    SUCCESS: () => ({}),
    RESET: () => ({})
  }
});