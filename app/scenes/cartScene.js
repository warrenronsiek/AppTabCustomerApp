/**
 * Created by warren on 3/1/17.
 */
import React, {Component} from 'react';
import CartListConnected from '../redux/connectedComponents/cartListConnected';
import {connect} from 'react-redux';

class CartScene extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <CartListConnected/>
    )
  }
}

export default connect()(CartScene)