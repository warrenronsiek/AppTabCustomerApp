/**
 * Created by warren on 1/23/17.
 */
import {connect} from 'react-redux'
import selectNode from '../middleware/nodeThunk'
import NodeList from '../components/nodeList'
import {sortBy, filter} from 'lodash'

const mapStateToProps = (state) => {
  return {
    nodeListItems: sortBy(state.nodes, ['nodeId', 'nodeName']),
    renderNodes: state.nodes.length > 0,
    activeNode: state.activeNode
  }
};

const mapDispatchToProps = (dispatch) => {
  return {selectNode: (nodeId) => dispatch(selectNode(nodeId))}
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeList)