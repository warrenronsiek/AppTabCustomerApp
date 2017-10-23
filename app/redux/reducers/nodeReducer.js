/**
 * Created by warren on 1/23/17.
 */
import {UPDATE_NODE_API, UPDATE_NODE_BLE, SET_ACTIVE_NODE, SET_NODE_QUERIED} from '../actions/nodeActions'
import uuid from 'react-native-uuid'
import * as _ from 'lodash'
import chunk from 'lodash/fp/chunk'
import sortBy from 'lodash/fp/sortBy'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import pick from 'lodash/fp/pick'
import flow from 'lodash/fp/flow'

/*
viewableNodes has a structure of :
[
 {
  data: [
    {nodeId, venueId},
    {nodeId, venueId},
    {nodeId, venueId}
  ],
  key: somekey
 },
 ...
  {
  data: [
    {nodeId, venueId},
    {nodeId, venueId},
    {nodeId, venueId}
  ],
  key: someotherkey
 },
]
*/
export const nodes = (state = {nodeList: [], viewableNodes: [], showNodes: false}, action) => {
  let updatedNode, oldNode, filteredState;
  switch (action.type) {
    case UPDATE_NODE_BLE:
      oldNode = _.find(state.nodeList, ['nodeId', action.nodeId]);
      filteredState = state.nodeList.filter((node) => node.nodeId !== action.nodeId);
      if (oldNode) {
        updatedNode = {
          ...oldNode,
          nodeId: action.nodeId,
          distance: action.distance,
          instance: action.instance,
          lastSeen: action.lastSeen,
          updatedCount: oldNode.updatedCount + 1
        };
        return {...state, nodeList: [...filteredState, updatedNode]}
      } else {
        return {
          ...state, nodeList: [...filteredState, {
            nodeId: action.nodeId,
            distance: action.distance,
            instance: action.instance,
            lastSeen: action.lastSeen,
            updatedCount: 1
          }]
        }
      }
    case UPDATE_NODE_API:
      oldNode = _.find(state.nodeList, ['nodeId', action.nodeId]);
      filteredState = state.nodeList.filter((node) => node.nodeId !== action.nodeId);
      let newNodeList;
      if (oldNode) {
        newNodeList = [...filteredState, {
          nodeId: action.nodeId,
          nodeName: action.nodeName,
          nodeDescription: action.nodeDescription,
          venueId: action.venueId,
          apiQueried: true
        }]
      } else {
        updatedNode = {
          ...oldNode,
          nodeId: action.nodeId,
          nodeName: action.nodeName,
          nodeDescription: action.nodeDescription,
          venueId: action.venueId,
          apiQueried: true
        };
        newNodeList = [...filteredState, updatedNode]
      }
      console.log(state);
      return {
        nodeList: newNodeList,
        viewableNodes: flow(
          filter(node => !!node.venueId),
          map(node => _.pick(node, ['venueId', 'nodeId'])),
          sortBy(node => node.nodeId.slice(-3)),
          chunk(3),
          map(nodeChunk => ({data: nodeChunk, key: nodeChunk[0].nodeId}))
        )(newNodeList),
        showNodes: true
      };
    case SET_NODE_QUERIED:
      oldNode = _.find(state.nodeList, ['nodeId', action.nodeId]);
      filteredState = state.nodeList.filter((node) => node.nodeId !== action.nodeId);
      if (oldNode) {
        return {
          ...state,
          nodeList: [...filteredState, {
            ...oldNode,
            nodeId: action.nodeId,
            apiQueried: true
          }]
        }
      } else {
        updatedNode = {
          nodeId: action.nodeId,
          apiQueried: true
        };
        return {...state, nodeList: [...filteredState, updatedNode], viewableNodes: []}
      }
    default:
      return state
  }
};

export const activeNode = (state = {nodeId: "", sessionId: ""}, action) => {
  switch (action.type) {
    case SET_ACTIVE_NODE:
      return {
        nodeId: action.nodeId,
        sessionId: state.nodeId === action.nodeId ? state.sessionId : uuid.v4(),
        venueId: action.venueId
      };
    default:
      return state
  }
};