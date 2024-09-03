import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandller = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    res.status(400).send({errors: [ { message: "Page not error" }]});
};