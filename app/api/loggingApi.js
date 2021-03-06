/**
 * Created by warren on 5/25/17.
 */
import {url, apiKey} from '../vars'
import {omit} from 'lodash'
import store from '../redux/store'

export default logger = (message, error, file, lineNumber) => {
  fetch(url + '/logger', {
    method: 'POST',
    headers: {'x-api-key': apiKey},
    body: JSON.stringify({state: omit(store.getState(), ['creditCard', 'loginParams', 'registerParams']), message, error, file, lineNumber})
  })
};
