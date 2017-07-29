import store from '../redux/store'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'
import {identityPoolId, firehoseName} from "../vars"
import {omit, get} from 'lodash'
import logger from './loggingApi'

AWS.config.region = 'us-west-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolId,
  region: 'us-west-2',
});

const updateCredentials = () => {
  const auth = store.getState().auth;
  AWS.config.credentials.Login = {
    'cognito-idp.us-west-2.amazonaws.com/us-west-2_ct1EHN2VZ': auth.idToken
  };
  AWS.config.credentials.expired = true
};

const firehose = new AWS.Firehose();

const writeToFirehose = type => {
  const state = store.getState();
  return firehose.putRecord({
    DeliveryStreamName: firehoseName,
    Record: {
      Data: JSON.stringify({
        state: omit(state, ['creditCard', 'loginParams', 'registerParams', 'auth', 'passwordResetData', 'deviceToken']),
        customerId: get(state, 'auth.customerId', 'null'),
        deviceToken: get(state, 'deviceToken', 'null'),
        date: Date.now(),
        type
      })
    }
  }).promise();
};

export {writeToFirehose, updateCredentials}