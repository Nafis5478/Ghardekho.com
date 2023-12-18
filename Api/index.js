import express from  'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './route/user.router.js'
dotenv.config()
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connect to database...');
})
.catch((err)=>{
    console.log(err);
});

const app=express();

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!!');
});

app.use("/api/user",userRoute)