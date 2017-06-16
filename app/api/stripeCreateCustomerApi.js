/**
 * Created by warren on 3/27/17.
 */
import requester from './requester'

//pass object of shape {customerId}
export default requester('/stripe-create-customer', 'StripeClientCreationSuccessful', 'Stripe failed to create customer')