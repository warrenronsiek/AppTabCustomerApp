import BasicError from './basicError';

export default class NoVenuesError extends BasicError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = 'NoVenuesError';
  }
}