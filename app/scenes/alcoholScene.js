/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import menuComponentWillMount from '../common/menuComponentWillMount';
import {connect} from 'react-redux';
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected';

const AlcoholList = MenuListBlueprint('alcohol');

class AlcoholScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <AlcoholList/>
    )
  }
};

export default connect()(AlcoholScene)