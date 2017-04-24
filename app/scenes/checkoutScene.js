/**
 * Created by warren on 3/25/17.
 */
import React, {Component} from 'react'
import PaymentSelection from '../redux/connectedComponents/paymentSelectionConnected'
import {connect} from 'react-redux'

class CheckoutScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  render() {
    return (
      <PaymentSelection/>
    )
  }
}

export default connect()(CheckoutScene)