

export const UPDATE_NODE = 'UPDATE_NODE';
export const updateNode = ({nodeId, nodeName, venueId, beaconId}) => {
  return {type: UPDATE_NODE, payload: {nodeId, nodeName, venueId, beaconId}}
};

export const SET_ACTIVE_NODE = 'SET_ACTIVE_NODE';
export const setActiveNode = ({nodeId, nodeName, venueId, beaconId}) => {
  return {type: SET_ACTIVE_NODE, payload: {nodeId, nodeName, venueId, beaconId}}
};

