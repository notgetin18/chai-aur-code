import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

// added this "-r dotenv/config --experimental-json-modules" in dev script of package.json to avoid this
//  import 'dotenv/config' to load env variables before anything else
//  --experimental-json-modules to avoid error while importing json files
dotenv.config({
  path: './env',
});

// Connect with DB and Server 
connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port ${process.env.PORT}`);
    });

    // Attach error listener to server
    server.on('error', (error) => {
      console.log('Server Error:', error);
      throw error;
    });
  })
  .catch((err) => {
    console.log('MONGODB Connection Failed !!!', err);
  });

/*
import mongoose from 'mongoose';
import { DB_NAME } from './constant';

TODO: this is general approach to connect database which is correct and good to go but it can be done 
in some better way like connect in db folder and call the fn. here

import express from 'express';
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    app.on(
      ('ERROR',
      (error) => {
        console.log('ERROR', error);
        throw error;
      })
    );

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log('ERROR', error);
    throw error;
  }
})();
*/
