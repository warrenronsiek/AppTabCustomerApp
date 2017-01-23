/**
 * Created by warren on 10/27/16.
 */
import BasicError from './basicError';

export default class UserExistsError extends BasicError {
    constructor(fileName, lineNumber) {
        super('This username already exists', fileName, lineNumber);
        this.name = 'UserExistsError';
    }
}