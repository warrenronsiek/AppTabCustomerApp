/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected'
import PropTypes from 'prop-types'

const DessertList = MenuListBlueprint('dessert');

class DessertScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    return (
      <DessertList/>
    )
  }
};

export default connect()(DessertScene)