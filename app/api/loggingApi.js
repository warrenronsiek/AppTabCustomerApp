/**
 * Created by warren on 5/25/17.
 */
import {url} from '../vars'
import {omit} from 'lodash'

export default logger = (state, message, error) => {
  fetch(url + '/logger', {method: 'POST', body: JSON.stringify({state: omit(state, ['cardData']), message, error})})
};
