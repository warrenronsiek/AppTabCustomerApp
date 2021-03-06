/**
 * Created by warren on 4/28/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CardForm from '../redux/connectedComponents/creditCardFormConnected'
import {connect} from 'react-redux'

class CreditCardForm extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    return (
      <CardForm/>
    )
  }
}

export default connect()(CreditCardForm)