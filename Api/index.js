

// // while using mongo db compass...

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoute from './route/user.router.js';
// import authRoute from './route/auth.router.js';
// import listingRouter from './route/listing.router.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// dotenv.config();
// // in case we are using mongo db compass....

// // mongoose.connect(process.env.MONGO2, {
// //     dbName: process.env.dbname // Specify the database name
// // })
// //     .then(() => {
// //         console.log('Connected to the database...');
// //     })
// //     .catch((err) => {
// //         console.error('Error connecting to the database:', err);
// //     });
// // in case we are using mongo db atlas....
// mongoose.connect(process.env.MONGO)
//     .then(() => {
//         console.log('Connected to the database...');
//     })
//     .catch((err) => {
//         console.error('Error connecting to the database:', err);
//     });


// const __dirname=path.resolve();
// const app = express();

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// app.use(express.json());
// app.use(cookieParser());


// app.use('/api/user', userRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname,'/Client/dist')));
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'Client','dist','index.html'));
// })

// app.use((err, req, res, next) => {
//     console.error('Error:', err.stack); // Log the error stack trace

//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal server error';

//     if (res.headersSent) {
//         console.error('Headers already sent, cannot send error response again.');
//         return next(err);
//     }

//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message
//     });
// });


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route/user.router.js';
import authRoute from './route/auth.router.js';
import listingRoute from './route/listing.router.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGO,{
    connectTimeoutMS: 30000, // Set connection timeout to 30 seconds
  socketTimeoutMS: 30000,  // Set socket timeout to 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRoute);


app.use(express.static(path.join(__dirname, '/Client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
