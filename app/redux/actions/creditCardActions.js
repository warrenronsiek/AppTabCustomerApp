/**
 * Created by warren on 4/1/17.
 */
import {createActions} from 'redux-actions'

export default ccActions = createActions({
  REAL: {
    UPDATE: {
      NUMBER: cardNumber => cardNumber,
      EXP_YEAR: year => year,
      EXP_MONTH: monthNumber => monthNumber,
      CCV: number => number,
      ZIP: number => number
    },
    WIPE: cardNumber => cardNumber
  },
  TOKEN: {
    ADD: (ccToken, last4, brand, exp_month, exp_year) => ({ccToken, last4, brand, exp_month, exp_year}),
    DELETE: ccToken => ccToken,
    SET_SELECTED: ccToken => ccToken,
  },
  API_QUERIED: bool => bool
});