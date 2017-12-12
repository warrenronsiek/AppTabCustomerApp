/**
 * Created by warren on 1/23/17.
 */
import {UPDATE_NODE_API, UPDATE_NODE_BLE, SET_ACTIVE_NODE, SET_NODE_QUERIED} from '../actions/nodeActions'
import {UPDATE_ACTIVE_VENUE} from "../actions/venueActions";
import uuid from 'react-native-uuid'
import * as _ from 'lodash'
import chunk from 'lodash/fp/chunk'
import sortBy from 'lodash/fp/sortBy'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import pick from 'lodash/fp/pick'
import flow from 'lodash/fp/flow'
import {devData} from "../../common/devData";

export const nodes = (state = {
  nodeList: __DEV__ ? devData.nodeList : [],
  viewableNodes: __DEV__ ? devData.viewableNodes : [],
  showNodes: __DEV__, activeVenueId: __DEV__ ? devData.activeVenueId : ''
}, action) => {
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
      let viewableNodes = flow(
        filter(node => !!node.venueId),
        map(node => _.pick(node, ['venueId', 'nodeId'])),
        filter(node => node.venueId === state.activeVenueId),
        sortBy(node => node.nodeId.slice(-3)),
        chunk(3),
        map(nodeChunk => ({data: nodeChunk, key: nodeChunk[0].nodeId}))
      )(newNodeList);
      return {
        ...state, nodeList: newNodeList,
        viewableNodes: viewableNodes,
        showNodes: viewableNodes.length > 0
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
    case UPDATE_ACTIVE_VENUE:
      let viewableNodes2 = flow(
        filter(node => !!node.venueId),
        map(node => _.pick(node, ['venueId', 'nodeId'])),
        filter(node => node.venueId === action.payload.venueId),
        sortBy(node => node.nodeId.slice(-3)),
        chunk(3),
        map(nodeChunk => ({data: nodeChunk, key: nodeChunk[0].nodeId}))
      )(state.nodeList);
      return {
        ...state,
        activeVenueId: action.payload.venueId,
        viewableNodes: viewableNodes2,
        showNodes: viewableNodes2.length > 0
      };
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