/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import menuComponentWillMount from '../common/menuComponentWillMount';
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected';

const AppetizerList = MenuListBlueprint('appetizer');

class AppetizerScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <AppetizerList/>
    )
  }
};

export default connect()(AppetizerScene)