/**
 * Created by warren on 1/23/17.
 */

export const UPDATE_NODE_BLE = 'UPDATE_NODE_BLE';
export const updateNodeBle = (distance, namespace, instance, lastSeen) => {
    return {type: UPDATE_NODE_BLE, distance, namespace, instance, lastSeen, nodeId: namespace + instance}
};

export const UPDATE_NODE_API = 'UPDATE_NODE_API';
export const updateNodeApi = (nodeId, nodeName, nodeDescription) => {
    return {type: UPDATE_NODE_API, nodeId, nodeName, nodeDescription}
};

export const SET_ACTIVE_NODE = 'SET_ACTIVE_NODE';
export const setActiveNode = (nodeId) => {
    return {type: SET_ACTIVE_NODE, nodeId}
};