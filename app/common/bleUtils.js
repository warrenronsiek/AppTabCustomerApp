import BeaconTypeError from "../errors/beaconTypeError";
import * as _ from "lodash";
import {Platform} from "react-native";
import {Buffer} from 'buffer';

function parseIntObject(b64string) {
  const decoded = Buffer.from(b64string, 'base64').toString('hex');
  return {namespace: decoded.slice(4, 24), instance: decoded.slice(24, 36) }
}

function parseBlePacket(item) {
  console.log('called ble packet parser', item);
  return new Promise((resolve, reject) => {
      if (item.localName === 'Kontakt') {
        const data = parseIntObject(item.serviceData['0000feaa-0000-1000-8000-00805f9b34fb']);
        const distance = Math.pow(10, ((item.txPowerLevel - item.rssi) - 41) / 20.0);
        const lastSeen = Math.floor(Date.now() / 1000);
        resolve({instance: data.instance, namespace: data.namespace, distance, lastSeen})
      } else {
        reject(new BeaconTypeError('NotKontaktBeacon'))
      }
    }
  );
}

export {parseBlePacket}