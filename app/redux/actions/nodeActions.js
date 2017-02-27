/**
 * Created by warren on 1/23/17.
 */

export const UPDATE_NODE_BLE = 'UPDATE_NODE_BLE';
export const updateNodeBle = (distance, namespace, instance, lastSeen) => {
    return {type: UPDATE_NODE_BLE, distance, namespace, instance, lastSeen, nodeId: instance}
};

export const UPDATE_NODE_API = 'UPDATE_NODE_API';
export const updateNodeApi = (nodeId, nodeName, nodeDescription, venueId) => {
    return {type: UPDATE_NODE_API, nodeId, nodeName, nodeDescription, venueId}
};

export const SET_ACTIVE_NODE = 'SET_ACTIVE_NODE';
export const setActiveNode = (nodeId) => {
    return {type: SET_ACTIVE_NODE, nodeId}
};

export const SET_NODE_QUERIED = 'SET_NODE_QUERIED';
export const setNodeQueried = (nodeId) => {
  return {type: SET_NODE_QUERIED, nodeId}
};

