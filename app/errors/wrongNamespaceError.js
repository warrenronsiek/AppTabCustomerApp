import BasicError from './basicError'

export default class WrongNamespaceError extends BasicError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = 'WrongNamespaceError';
  }
}