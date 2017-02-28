/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import AppetizerList from '../redux/connectedComponents/appetizerListConnected';
import {connect} from 'react-redux';
import menuComponentWillMount from '../common/menuComponentWillMount';

class AppetizerScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
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