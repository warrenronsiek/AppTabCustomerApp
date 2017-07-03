/**
 * Created by warren on 6/26/17.
 */
import requester from './requester'

// invoke with {confirmationCode, password, phoneNumber}
export default requester('/reset-password', 'PasswordResetSuccessful', 'PasswordResetFailed')