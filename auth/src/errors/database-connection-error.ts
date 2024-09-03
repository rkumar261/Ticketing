import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
    statusCode = 400;

    error = "klajdljfljdla";
    constructor() {
        super("Database connection error");

        // Only because we are extending the build in class 
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return  [{message: "this is database error", field: "ljalkdjflkj"}];
    }
}