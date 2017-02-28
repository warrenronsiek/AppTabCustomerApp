/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import AlcoholList from '../redux/connectedComponents/alcoholListConnected';
import menuComponentWillMount from '../common/menuComponentWillMount';
import {connect} from 'react-redux';

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