import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    const dbConnection = await mongoose.connect(mongodbUri);

    console.log(`MongoDB connected: ${dbConnection.connection.host}`);
  } catch (error) {
    console.error('Database Connection Failed', error);
    process.exit(1);
  }
};

export default connectDB;
