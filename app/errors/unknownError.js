/**
 * Created by warren on 10/27/16.
 */
import BasicError from './basicError';

export default class UnknownError extends BasicError {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = 'UnknownError';
    }
}