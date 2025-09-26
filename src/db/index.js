import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB Connected DB HOST: ${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('MongoDB connection FAILED:', error);
    process.exit(1);
  }
};

export default connectDB;
