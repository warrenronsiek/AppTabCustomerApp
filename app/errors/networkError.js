/**
 * Created by warren on 10/24/16.
 */
import BasicError from './basicError';

export default class NetworkError extends BasicError {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = 'NetworkError';
    }
}