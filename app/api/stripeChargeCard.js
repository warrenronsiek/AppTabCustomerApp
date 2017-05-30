/**
 * Created by warren on 5/5/17.
 */
import requester from './requester'

// pass object of shape {total, stripeToken, cardToken, nodeId, customerId, items}
export default requester('/stripe-charge-card', 'CreditCardChargeSuccessful', 'ChargingCardFailed')