/**
 * Created by warren on 1/23/17.
 */
import React, {Component} from 'react'
import Nodes from '../redux/connectedComponents/nodeListConnected'
import {componentWillUnmount} from '../common/bleScannerComponentFunctions'

class NodeScene extends Component {

  componentWillUnmount() {
    componentWillUnmount()
  }

  render() {
    return (
      <Nodes/>
    )
  }
}

export default NodeScene