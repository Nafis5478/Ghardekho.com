// import express from  'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import userRoute from './route/user.router.js'
// import authRoute from './route/auth.router.js'
// dotenv.config()
// mongoose.connect(process.env.MONGO)
// .then(()=>{
//     console.log('connect to database...');
// })
// .catch((err)=>{
//     console.log(err);
// });

// const app=express();

// app.listen(3000,()=>{
//     console.log('Server is running on port 3000!!!');
// });
// app.use(express.json())
// app.use("/api/user",userRoute)
// app.use("/api/auth",authRoute)


// while using mongo db compass...

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route/user.router.js';
import authRoute from './route/auth.router.js';

dotenv.config();

mongoose.connect(process.env.MONGO2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.dbname // Specify the database name
})
    .then(() => {
        console.log('Connected to the database...');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});

app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
