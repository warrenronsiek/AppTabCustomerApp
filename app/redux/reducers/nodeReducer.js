import {UPDATE_NODE, SET_ACTIVE_NODE} from "../actions/nodeActions";

const nodes = (state = [], action) => {
  switch (action.type) {
    case UPDATE_NODE:
      let oldNode = state.filter(node => node.nodeId === action.payload.nodeId)[0];
      if (!!oldNode) {
        return [...state, action.payload]
      }
      return [state.filter(node => node.nodeId !== action.payload.nodeId), action.payload];
    default:
      return state
  }
};

const activeNode = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_NODE:
      return {...state, ...action.payload};
    default:
      return state
  }
};

export {activeNode, nodes}