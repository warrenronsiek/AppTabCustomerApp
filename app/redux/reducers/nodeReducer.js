import {UPDATE_NODE, SET_ACTIVE_NODE} from "../actions/nodeActions";
import {UPDATE_ACTIVE_VENUE} from "../actions/venueActions";
import uuid from "react-native-uuid";

const nodes = (state = {nodes: [], visibleNodes: [], showNodes: false}, action) => {
  switch (action.type) {
    case UPDATE_NODE:
      let oldNode = state.nodes.filter(node => node.nodeId === action.payload.nodeId)[0];
      if (!!oldNode) {
        return {...state, nodes: [...state.nodes, action.payload]}
      }
      return [state.filter(node => node.nodeId !== action.payload.nodeId), action.payload];
    case UPDATE_ACTIVE_VENUE:
      let visibleNodes = state.nodes.filter(node => node.venueId === action.payload.venueId);
      return {...state, visibleNodes: visibleNodes, showNodes: true};
    default:
      return state
  }
};

const activeNode = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_NODE:
      return {...state, ...action.payload, sessionId: state.nodeId === action.nodeId? state.sessionId : uuid.v4()};
    default:
      return state
  }
};

export {activeNode, nodes}