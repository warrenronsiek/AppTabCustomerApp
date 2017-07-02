/**
 * Created by warren on 7/2/17.
 */
import requester from './requester'

// invoke with object of shape {userName}
export default requester('/registration-resend-code', 'RegistrationCodeResendSuccessful', 'ResendCodeFailed', null, false)