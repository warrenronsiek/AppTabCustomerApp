/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react'
import menuComponentWillMount from '../common/menuComponentWillMount'
import {connect} from 'react-redux'
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected'
import PropTypes from 'prop-types'

const DrinkList = MenuListBlueprint('drink');

class DrinkScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <DrinkList/>
    )
  }
}

export default connect()(DrinkScene)