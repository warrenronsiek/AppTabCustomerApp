/**
 * Created by warren on 10/24/16.
 */
import BasicError from './basicError';

export default class ValidationError extends BasicError {
    constructor(message, response) {
        super(message, response);
        this.name = 'ValidationError';
    }
}
