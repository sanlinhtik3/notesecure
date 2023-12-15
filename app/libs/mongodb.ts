import mongoose, { ConnectOptions } from "mongoose";

// Define the ConnectOptions type with the useUnifiedTopology property
interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology?: boolean;
}

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    console.log(error);
  }
};

export default connectMongoDB;