/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import menuComponentWillMount from '../common/menuComponentWillMount';
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected';

const MainList = MenuListBlueprint('main');

class MainScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
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