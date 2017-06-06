/**
 * Created by warren on 6/5/17.
 */
import {updatePhoneNumber} from '../actions/registerActions'
import phoneFormatter from 'phone-formatter'

const formatUpdatePhoneNumber = phoneNumber => (dispatch) => {
  const formatted = phoneFormatter.format(phoneNumber.replace(/[^0-9]+/g, ''), "(NNN) NNN-NNNN").replace(/N/g, ' ');
  dispatch(updatePhoneNumber(formatted));
};

export default formatUpdatePhoneNumber