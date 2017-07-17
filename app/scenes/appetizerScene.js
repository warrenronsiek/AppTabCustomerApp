/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected'

const AppetizerList = MenuListBlueprint('appetizer');

class AppetizerScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    return (
      <AppetizerList/>
    )
  }
};

export default connect()(AppetizerScene)