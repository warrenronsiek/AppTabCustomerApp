/**
 * Created by warren on 4/28/17.
 */
import ccForm from '../components/creditCardForm'
import validator from 'payment'
import ccActions from '../actions/creditCardActions'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {addSpaces} from '../middleware/cardValidationThunks'
import creditCardFormThunk from '../middleware/creditCardFormThunk'

const validateZip = zip => {
  if ('undefined' === typeof zip) {
    return false
  } else   {
    return (!isNaN(parseFloat(zip)) && isFinite(zip) && (zip.toString().length === 5))
  }
};

const mapStateToProps = state => {
  return {
    ccNumber: state.creditCard.cardNumber,
    ccNumberValid: validator.fns.validateCardNumber(state.creditCard.cardNumber || ''),
    expYear: state.creditCard.expYear,
    expMonth: state.creditCard.expMonth,
    expiryValid: validator.fns.validateCardExpiry(state.creditCard.expMonth || '', state.creditCard.expYear || ''),
    ccv: state.creditCard.ccv,
    ccvValid: validator.fns.validateCardCVC(state.creditCard.ccv || ''),
    zip: state.creditCard.zip,
    zipValid: validateZip(state.creditCard.zip),
    brand: validator.fns.cardType(state.creditCard.cardNumber || '')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateCCNumber: ccNumber => dispatch(addSpaces(ccNumber)),
    updateExpYear: expYear => dispatch(ccActions.real.update.expYear(expYear)),
    updateExpMonth: expMonth => dispatch(ccActions.real.update.expMonth(expMonth)),
    updateZip: zip => dispatch(ccActions.real.update.zip(zip)),
    updateCCV: ccv => dispatch(ccActions.real.update.ccv(ccv)),
    submit: (cardNumber, expMonth, expYear, ccv) => dispatch(creditCardFormThunk(cardNumber, expMonth, expYear, ccv))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ccForm)