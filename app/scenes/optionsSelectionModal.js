import React, {Component} from 'react'
import PropTypes from 'prop-types'
import OptionsListConnected from '../redux/connectedComponents/optionsListConnected'
import {connect} from 'react-redux'

class OptionsSelectionModal extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    return (
      <OptionsListConnected/>
    )
  }
}

export default connect()(OptionsSelectionModal)