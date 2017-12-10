import {parseBlePacket} from "./bleUtils";
import {setNodeQueried, updateNodeApi, updateNodeBle} from "../redux/actions/nodeActions";
import logger from "../api/loggingApi";
import getVenue from '../api/getVenue'
import GetNodeQueriedError from "../errors/getNodeQueriedError";
import WrongNamespaceError from "../errors/wrongNamespaceError";
import * as _ from "lodash";
import getNodeInfo from "../api/nodeApi";
import store from '../redux/store'
import {updateVenue} from "../redux/actions/venueActions";
import {BluetoothStatus} from 'react-native-bluetooth-status'


const noble = require('react-native-ble');

const componentWillMount = () => {
  noble.on('discover', onFound);
};

const componentDidMount = () => {
  const waiter = function () {
    BluetoothStatus.state()
      .then(res => {
        if (!res) {
          alert('Your phone\'s bluetooth is turned off.\nThe app won\'t be able to detect your restaurant until it is turned on.');
          throw new Error('Bluetooth not turned on.')
        } else if (noble.state === 'poweredOn') {
          noble.startScanning([], true);
        } else {
          throw new Error('Noble not powered on.')
        }
      })
      .catch(err => setTimeout(waiter, 100));
  };
  waiter()
};

const componentWillUnmount = () => {
  noble.stopScanning();
};

const onFound = (item) => {
    parseBlePacket(item)
      .then(res => {
        if (res.namespace === 'bc635921402893714ad5') {
          return Promise.resolve(store.dispatch(updateNodeBle(res.distance, res.namespace, res.instance, res.lastSeen)))
        }
        else {
          throw new WrongNamespaceError('node has incorrect namespace')
        }
      })
      .then(res => {
        const nodeState = _.find(store.getState().nodes.nodeList, {nodeId: res.nodeId});
        if (nodeState.apiQueried === undefined) {
          store.dispatch(setNodeQueried(res.nodeId));
          return getNodeInfo({nodeId: res.nodeId})
        } else {
          throw new GetNodeQueriedError('GetNode api already queried for this node')
        }
      })
      .then(res => {
        const node = res.nodeInfo.Item;
        const nodeId = node.NodeId.S, nodeName = node.NodeName.S, nodeDescription = node.NodeDescription.S,
          venueId = node.VenueId.S;
        store.dispatch(updateNodeApi(nodeId, nodeName, nodeDescription, venueId));
        return getVenue({venueId})
      })
      .then(res => {
        store.dispatch(updateVenue({venueId: res.venue.Item.VenueId.S, venueName: res.venue.Item.Name.S, address: res.venue.Item.Address.S}));
        return Promise.resolve()
      })
      .catch(err => {
        switch (err.name) {
          case 'TypeError':
            break;
          case 'BeaconTypeError':
            break;
          case 'GetNodeQueriedError':
            break;
          case 'WrongNamespaceError':
            break;
          default:
            logger('error processing node', err);
            break;
        }
      });
  };

export {componentDidMount, componentWillMount, componentWillUnmount}
