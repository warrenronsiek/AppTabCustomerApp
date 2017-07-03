/**
 * Created by warren on 6/16/17.
 */

import {connect} from 'react-redux'
import {updateConfirmationCode} from '../actions/registerActions'
import confirmationCodeEntry from '../components/confirmationCodeEntry'
import codeConfirmThunk from '../middleware/codeConfirmThunk'
import resendCode from '../../api/registrationResendCode'
import phoneFormatter from 'phone-formatter'

const mapStateToProps = (state) => ({
  confirmationCode: state.confirmationCode,
  processing: state.registerState.confirmationCodeProcessing,
  wrongConfirmationCode: state.registerState.wrongConfirmationCode,
  networkError: state.registerState.networkError,
  unknownError: state.registerState.unknownError,
  resendCode: () => resendCode({phoneNumber: phoneFormatter.normalize(state.registerParams.phoneNumber)})
});

const mapDispatchToProps = (dispatch) => ({
  codeEntryComplete: confirmationCode => dispatch(codeConfirmThunk(confirmationCode)),
  updateConfirmationCode: text => dispatch(updateConfirmationCode(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(confirmationCodeEntry)