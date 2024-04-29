import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  phone: {
    type: String,
    maxlength: 10,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
const User = mongoose.model("user", userSchema);
export { User };
