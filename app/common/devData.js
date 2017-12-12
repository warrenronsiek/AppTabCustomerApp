import {useDevData} from '../vars'

console.log(useDevData);
const devData = useDevData
  ? {
    nodeList: [{
      nodeId: '743365397002',
      nodeName: '2',
      nodeDescription: 'Table 2',
      venueId: '5913c829b6739ed3b963',
      apiQueried: true,
      distance: 0.35481338923357547,
      instance: '743365397002',
      lastSeen: 1513106892,
      updatedCount: null
    },
      {
        nodeId: '796834353003',
        nodeName: '3',
        nodeDescription: 'Table 3',
        venueId: '5913c829b6739ed3b963',
        apiQueried: true,
        distance: 6.309573444801942e-11,
        instance: '796834353003',
        lastSeen: 1513106893,
        updatedCount: null
      },
      {
        nodeId: '58496c553001',
        nodeName: '1',
        nodeDescription: 'Table 1',
        venueId: '5913c829b6739ed3b963',
        apiQueried: true,
        distance: 6.309573444801942e-11,
        instance: '58496c553001',
        lastSeen: 1513106893,
        updatedCount: null
      }],
    viewableNodes: [
      {
        data: [
          {
            venueId: '5913c829b6739ed3b963',
            nodeId: '58496c553001'
          },
          {
            venueId: '5913c829b6739ed3b963',
            nodeId: '743365397002'
          },
          {
            venueId: '5913c829b6739ed3b963',
            nodeId: '796834353003'
          }
        ],
        key: '58496c553001'
      }
    ],
    activeVenueId: '5913c829b6739ed3b963',
    loginParams: {
      password: 'P@33word', phoneNumber: '(510) 883-4346'
    },
    venues: [{venueId: '5913c829b6739ed3b963', address: '1234 Market Street', venueName: 'Stu\'s Stews'}],
    deviceToken: {
      token: '9003c821a24020e164201a223162fb1a6ba2a9cc96e6750f2dfdf69cda54e39e',
      os: 'ios'
    }
  }
  : {
    nodeList: [],
    viewableNodes: [],
    activeVenueId: '',
    loginParams: {
      password: '',
      phoneNumber: '',
    },
    venues: []
  };

export {devData}