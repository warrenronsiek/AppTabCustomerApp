/**
 * Created by warren on 4/29/17.
 */
import ccActions from '../actions/creditCardActions'

const addSpaces = cardNumberString => dispatch => {
  let condition = ('string' === typeof cardNumberString) && (!!cardNumberString);
  let x = condition ? cardNumberString.replace(/ /g, '').match(/.{1,4}/g).join(' ') : cardNumberString;
  dispatch(ccActions.real.update.number(x))
};

export {addSpaces}