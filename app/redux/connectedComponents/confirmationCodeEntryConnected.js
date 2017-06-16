/**
 * Created by warren on 6/16/17.
 */

import {connect} from 'react-redux'
import {updateConfirmationCode} from '../actions/registerActions'
import confirmationCodeEntry from '../components/confirmationCodeEntry'
import codeConfirmThunk from '../middleware/codeConfirmThunk'

const mapStateToProps = (state) => ({
  confirmationCode: state.confirmationCode,
  processing: state.registerState.confirmationCodeProcessing
});

const mapDispatchToProps = (dispatch) => ({
  codeEntryComplete: confirmationCode => dispatch(codeConfirmThunk(confirmationCode)),
  updateConfirmationCode: text => dispatch(updateConfirmationCode(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(confirmationCodeEntry)