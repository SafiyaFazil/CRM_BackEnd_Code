import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  
  adminEmail: {
    type: String,
    required: true,
    unique: true,
        trim: true,
  },
  adminPassword: {
    type: String,
    required: true,
      trim: true,
  },
});
const Admin = mongoose.model("admin", adminSchema);
export { Admin };
