/**
 * Created by warren on 10/27/16.
 */
import BasicError from './basicError';

export default class UserExistsError extends BasicError {
    constructor(response) {
        super('This username already exists', response);
        this.name = 'UserExistsError';
    }
}