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
  url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN'; //actual key: pk_live_FHmywJaXessS64PZR8tK5oOG
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:f92d5c52-4665-4d22-a58a-2a1937220937';
}

export {url, stripePublicKey, firehoseName, identityPoolId}