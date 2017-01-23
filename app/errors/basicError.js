/**
 * Created by warren on 10/24/16.
 */

export default class BasicError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message);
        this.name = this.constructor.name;
        var err = new Error();
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        this.message    = message    === undefined ? err.message    : message;
        this.fileName   = fileName   === undefined ? err.fileName   : fileName;
        this.lineNumber = lineNumber === undefined ? err.lineNumber : lineNumber;
    }
}