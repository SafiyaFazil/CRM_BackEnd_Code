import { Admin } from "../Models/admin.schema.js";
import jwt from "jsonwebtoken";
import { Products } from "../Models/product.schema.js";

export function getAdminByEmail(req) {
  return Admin.find({ adminEmail: req.body.adminEmail });
}

export function genarateToken(id) {
  return jwt.sign({ id }, process.env.SECRETKEY);
}

export function getAllProduct() {
  return Products.find().populate("user", "userName email");
}

export function getSearchProduct(item) {
  const result = Products.find({ productName: item });
  console.log(result);
  return result;
}
