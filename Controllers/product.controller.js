import { ReturnDocument } from "mongodb";
import { Products } from "../Models/product.schema.js";

export function getAllProduct() {
  return Products.find().populate("user", "userName email");
}

export function getSearchProduct(item) {
  const result = Products.find({ productName: item });
  console.log(result);
  return result;
}

export function getUserProduct(req) {
  return Products.find({ user: req.user._id }).populate("user", "userName");
}

export function postNewProduct(req) {
  const postDate = new Date().toJSON().slice(0, 10);
  return new Products({
    ...req.body,
    date: postDate,
    user: req.user._id,
  }).save();
}

export function updateProduct(req) {
  return Products.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
}

export function deleteProduct(req) {
  return Products.findByIdAndDelete({ _id: req.params.id });
}
