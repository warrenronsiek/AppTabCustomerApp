/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import menuComponentWillMount from '../common/menuComponentWillMount'
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected'
import PropTypes from 'prop-types'

const MainList = MenuListBlueprint('main');

class MainScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <MainList/>
    )
  }
};

export default connect()(MainScene)