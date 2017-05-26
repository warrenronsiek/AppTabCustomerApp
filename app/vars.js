/**
 * Created by warren on 5/25/17.
 */

let url, stripePublicKey;
if (__DEV__) {
  url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN'
} else {
  url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN' //actual key: pk_live_FHmywJaXessS64PZR8tK5oOG
}

export {url, stripePublicKey}