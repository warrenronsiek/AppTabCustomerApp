/**
 * Created by warren on 4/24/17.
 */
import requester from './requester'

//pass object of shape {customerId: ::customerId::}
export default requester('/get-credit-cards', 'GetCardsSuccessful', 'Error in getting cards.')