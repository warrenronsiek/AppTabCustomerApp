import requester from './requester'

// invoke with {beaconId}
export default requester('/get-beacon-nodes', 'getBeaconNodes Successful', 'getBeaconNodes Failure', null, false)

