

// while using mongo db compass...

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route/user.router.js';
import authRoute from './route/auth.router.js';
import listingRouter from './route/listing.router.js';
import cookieParser from 'cookie-parser';

dotenv.config();
// in case we are using mongo db compass....

// mongoose.connect(process.env.MONGO2, {
//     dbName: process.env.dbname // Specify the database name
// })
//     .then(() => {
//         console.log('Connected to the database...');
//     })
//     .catch((err) => {
//         console.error('Error connecting to the database:', err);
//     });
// in case we are using mongo db atlas....
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to the database...');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(express.json());
app.use(cookieParser());


app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRouter);
app.use((err, req, res, next) => {
    console.error('Error:', err.stack); // Log the error stack trace

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    if (res.headersSent) {
        console.error('Headers already sent, cannot send error response again.');
        return next(err);
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

