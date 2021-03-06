/**
 * Created by warren on 1/23/17.
 */
import {connect} from 'react-redux'
import selectNode from '../middleware/nodeThunk'
import NodeList from '../components/nodeList'
import * as _ from 'lodash'

const mapStateToProps = (state) => {
  return {
    nodeListItems: state.nodes.viewableNodes,
    renderNodes: state.nodes.showNodes,
    activeNode: state.activeNode.nodeId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {selectNode: (nodeId) => dispatch(selectNode(nodeId))}
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeList)