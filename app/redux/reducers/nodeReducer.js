/**
 * Created by warren on 1/23/17.
 */
import {UPDATE_NODE_API, UPDATE_NODE_BLE, SET_ACTIVE_NODE, SET_NODE_QUERIED} from '../actions/nodeActions';
const _ = require('lodash');

export const nodes = (state = [], action) => {
  let updatedNode,
    oldNode = _.find(state, ['nodeId', action.nodeId]),
    filteredState = state.filter((node) => node.nodeId !== action.nodeId);
  switch (action.type) {
    case UPDATE_NODE_BLE:
      if (oldNode) {
        updatedNode = {
          ...oldNode,
          nodeId: action.nodeId,
          distance: action.distance,
          instance: action.instance,
          lastSeen: action.lastSeen,
          updatedCount: oldNode.updatedCount + 1
        };
        return [...filteredState, updatedNode]
      } else {
        return [...filteredState, {
          nodeId: action.nodeId,
          distance: action.distance,
          instance: action.instance,
          lastSeen: action.lastSeen,
          updatedCount: 1
        }]
      }
    case UPDATE_NODE_API:
      if (oldNode) {
        return [...filteredState, {
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
        return [...filteredState, updatedNode]
      }
    case SET_NODE_QUERIED:
      if (oldNode) {
        return [...filteredState, {
          ...oldNode,
          nodeId: action.nodeId,
          apiQueried: true
        }]
      } else {
        updatedNode = {
          nodeId: action.nodeId,
          apiQueried: true
        };
        return [...filteredState, updatedNode]
      }
    default:
      return state
  }
};

export const activeNode = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_NODE:
      return action.nodeId;
    default:
      return state
  }
};