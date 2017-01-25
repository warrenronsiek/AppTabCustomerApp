/**
 * Created by warren on 1/23/17.
 */
import {UPDATE_NODE_API, UPDATE_NODE_BLE, SET_ACTIVE_NODE} from '../actions/nodeActions';
const _ = require('lodash');

export const nodes = (state = [], action) => {
  let updatedNode,
    nodeIndex = _.findIndex(state, node => node.nodeId === action.nodeId),
    filteredState = state.filter((node) => node.nodeId !== action.nodeId);
  switch (action.type) {
    case UPDATE_NODE_BLE:
      if (nodeIndex === -1) {
        return [...filteredState, {
          nodeId: action.nodeId,
          distance: action.distance,
          instance: action.instance,
          lastSeen: action.lastSeen,
          venueId: action.venueId
        }]
      } else {
        updatedNode = {
          ...state[nodeIndex],
          nodeId: action.nodeId,
          distance: action.distance,
          instance: action.instance,
          lastSeen: action.lastSeen,
          venueId: action.venueId
        };
        return [...filteredState, updatedNode]
      }
    case UPDATE_NODE_API:
      if (nodeIndex === -1) {
        return [...filteredState, {
          nodeId: action.nodeId,
          nodeName: action.nodeName,
          nodeDescription: action.nodeDescription,
          apiQueried: true
        }]
      } else {
        updatedNode = {
          ...state[nodeIndex],
          nodeId: action.nodeId,
          nodeName: action.nodeName,
          nodeDescription: action.nodeDescription,
          apiQueried: true
        };
        return [...filteredState, updatedNode]
      }
    default:
      return state
  }
};

export const activeNode = (state="", action) => {
  switch (action.type) {
    case SET_ACTIVE_NODE:
      return action.nodeId;
    default:
      return state
  }
};