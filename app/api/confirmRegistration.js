/**
 * Created by warren on 6/16/17.
 */
import requester from './requester'

// invoke with {confirmationCode, phoneNumber}
export default requester('/confirm-registration', 'UserConfirmationSuccessful', 'Error Confirming User')