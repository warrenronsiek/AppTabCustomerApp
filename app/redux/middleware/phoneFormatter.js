/**
 * Created by warren on 6/5/17.
 */
import {updatePhoneNumber} from '../actions/registerActions'
import phoneNumberHandler from '../../common/phoneNumberHandler'

const formatUpdatePhoneNumber = phoneNumber => (dispatch) => {
  dispatch(updatePhoneNumber(phoneNumberHandler(phoneNumber)));
};

export default formatUpdatePhoneNumber