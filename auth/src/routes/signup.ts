import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage("Email must be valid"),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must have length between 4 and 20")
    ],
    async (req: Request, res: Response) => {
    
        const error = validationResult(req);

        if (!error.isEmpty()) {
            throw new RequestValidationError(error.array());
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }

        const user = User.build( {
            email: email,
            password: password
        });

        await user.save();
        res.status(201).send(user);
});

export { router as signupRouter };