/**
 * Created by warren on 5/25/17.
 */

let url, stripePublicKey, firehoseName, identityPoolId;
if (__DEV__) {
  url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN';
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:f92d5c52-4665-4d22-a58a-2a1937220937';
} else {
  url = 'https://3qqlpbfcv1.execute-api.us-west-2.amazonaws.com/prod';
  stripePublicKey = 'pk_live_FHmywJaXessS64PZR8tK5oOG';
  firehoseName = 'prod-apptab-data-stream';
  identityPoolId = 'us-west-2:2894af0f-10cd-4d69-8d3a-312ad988c289';
}

export {url, stripePublicKey, firehoseName, identityPoolId}