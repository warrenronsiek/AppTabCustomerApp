/**
 * Created by warren on 1/23/17.
 */
import BasicError from './basicError';

export default class BeaconTypeError extends BasicError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = 'BeaconTypeError';
  }
}