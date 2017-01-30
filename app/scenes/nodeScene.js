/**
 * Created by warren on 1/23/17.
 */
import React, {Component} from 'react';
import Nodes from '../redux/connectedComponents/nodeListConnected';
import {updateNodeApi, updateNodeBle, setNodeQueried} from '../redux/actions/nodeActions';
import getNodeInfo from '../api/nodeApi';
import BeaconTypeError from '../errors/beaconTypeError';
import GetNodeQueriedError from '../errors/getNodeQueriedError';
import {connect} from 'react-redux';
import {Buffer} from 'buffer';
const _ = require('lodash');
const noble = require('react-native-ble');

function parseIntObject(intObject) {
  const index = Math.max(...Object.keys(intObject).map(i => parseInt(i))) + 1;
  let arr = [];
  for (let i = 0; i < index; i++) {
    arr.push(intObject[i]);
  }
  const buff = Buffer.from(arr);
  const
    namespace = buff.slice(2, 12).toString('hex'),
    instance = buff.slice(12, 18).toString('hex'),
    txPower = buff.readInt8(1);
  return {namespace, instance, txPower}
}

//TODO: Make this filter by Eddystone IDs
function parseBlePacket(item) {
  return new Promise((resolve, reject) => {
      if (item.advertisement.localName === 'Kontakt') {
        const data = parseIntObject(_.filter(item.advertisement.serviceData, {uuid: 'feaa'})[0].data);
        const distance = Math.pow(10, ((data.txPower - item.rssi) - 41) / 20.0);
        const lastSeen = Math.floor(Date.now() / 1000);
        resolve({instance: data.instance, namespace: data.namespace, distance, lastSeen})
      } else {
        reject(new BeaconTypeError('NotKontaktBeacon'))
      }
    }
  );
}

class NodeScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    noble.on('discover', this._onFound);
    noble.on('updated', this._onFound);
  }

  componentDidMount() {
    const waiter = function () {
      if (noble.state === 'poweredOn') {
        noble.startScanning([], true);
      } else {
        setTimeout(waiter, 100)
      }
    };
    waiter()
  }

  componentWillUnmount() {
    noble.stopScanning();
  }

  //TODO: move this into middleware
  _onFound = (item) => {
    parseBlePacket(item)
      .then(res => {
        return Promise.resolve(this.props.dispatch(updateNodeBle(res.distance, res.namespace, res.instance, res.lastSeen)))
      })
      .then(res => {
        const nodeState = _.find(this.context.store.getState().nodes, {nodeId: res.nodeId});
        if (nodeState.apiQueried === undefined) {
          this.props.dispatch(setNodeQueried(res.nodeId));
          return getNodeInfo(res.nodeId)
        } else {
          throw new GetNodeQueriedError('GetNode api already queried for this node')
        }
      })
      .then(res => {
        const node = res.nodeInfo.Item;
        const nodeId = node.NodeId.S, nodeName = node.NodeName.S, nodeDescription = node.NodeDescription.S;
        return Promise.resolve(this.props.dispatch(updateNodeApi(nodeId, nodeName, nodeDescription)))
      })
      .catch(err => {
        switch (err.name) {
          case 'TypeError':
            break;
          case 'BeaconTypeError':
            break;
          case 'GetNodeQueriedError':
            break;
          default:
            console.log(err);
            break;
        }
      });
  };

  render() {
    return (
      <Nodes/>
    )
  }
}

export default connect()(NodeScene)