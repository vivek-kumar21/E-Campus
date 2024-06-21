import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = `${process.env.MONGODB_URI}`;
    const connectionInstance = await mongoose.connect(mongoURI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
