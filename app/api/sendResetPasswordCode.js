/**
 * Created by warren on 6/26/17.
 */
import requester from './requester'

// invoke with {userName}
export default requester('/send-reset-password-code', 'CallingSendResetPasswordCodeSuccessful', 'ErrorSendingCode')