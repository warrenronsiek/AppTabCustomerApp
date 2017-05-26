/**
 * Created by warren on 10/27/16.
 */
import BasicError from './basicError';

export default class UnknownError extends BasicError {
    constructor(message, response) {
        super(message, response);
        this.name = 'UnknownError';
    }
}