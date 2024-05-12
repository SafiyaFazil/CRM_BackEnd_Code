import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true,
    // required: true, // Remove 'required' constraint
  },
  productCode: {
    type: String,
    unique: true,
    // required: true, // Remove 'required' constraint
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
