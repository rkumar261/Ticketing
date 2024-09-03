import express from 'express';
import 'express-async-errors';
import { json }  from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

import { errorHandller } from './middlewares/error-handller'; 
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandller);

const start = async () => {
    // connect to the kubernaties mongodb cluster 
    // for loacl host replace wiht localhost

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {});
        console.log("connected to mongodb");
    } catch (error) {
        console.log(error);
    }
}

app.listen(3000, () => {
    console.log('listening port 3000')
});

start();

