import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    // unique: true, // Remove 'unique' constraint
    required: true,
  },
  productCode: {
    type: String,
    // unique: true, // Remove 'unique' constraint
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: "user",
  },
});

const Products = mongoose.model("products", productSchema);
export { Products };
