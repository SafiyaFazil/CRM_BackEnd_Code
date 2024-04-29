import mongoose from "mongoose";

export function dbConnection() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://saficute05:htQDUTniJSqJrky5@cluster0.lmqzhsz.mongodb.net/",
      params
    );
    console.log("Database Connected");
  } catch (error) {
    console.log("MongoDB connection Error");
  }
}
