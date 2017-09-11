/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MenuList from '../redux/connectedComponents/menuListConnected'
import PropTypes from 'prop-types'

class MenuScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    return (
      <MenuList/>
    )
  }
}

export default connect()(MenuScene)