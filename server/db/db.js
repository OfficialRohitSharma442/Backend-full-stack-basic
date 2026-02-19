import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGODB_URL);
    console.log('Mongo DB connect successfully');
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;
