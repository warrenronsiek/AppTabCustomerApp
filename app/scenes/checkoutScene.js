/**
 * Created by warren on 3/25/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PaymentSelection from '../redux/connectedComponents/paymentSelectionConnected'
import {connect} from 'react-redux'

class CheckoutScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    return (
      <PaymentSelection/>
    )
  }
}

export default connect()(CheckoutScene)