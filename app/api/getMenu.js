/**
 * Created by warren on 2/27/17.
 */
import requester from './requester'

// Pass an object of shape {venueId: ::venueId::}
export default requester('/get-menu', 'GetMenuSuccessful', 'Error in fetching venue.')