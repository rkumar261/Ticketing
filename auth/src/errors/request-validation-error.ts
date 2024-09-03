import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {
//         message: string;
//         field?: string;
//     }[];
// }

export class RequestValidationError extends  CustomError {
    statusCode: number = 400;
    
    constructor(public errors: ValidationError[]) {
        super("Request Validation Error");

        // Only because we are extending a built in class 
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        });
    }
}