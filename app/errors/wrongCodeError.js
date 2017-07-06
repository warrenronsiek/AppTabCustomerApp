/**
 * Created by warren on 6/17/17.
 */
import BasicError from './basicError';

export default class WrongCodeError extends BasicError {
  constructor(response) {
    super('Entered the wrong confirmation code', response);
    this.name = 'WrongConfirmationCode';
  }
}