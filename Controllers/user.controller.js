import { User } from "../Models/user.schema.js";
import jwt from "jsonwebtoken";

export function getUserByEmail(req) {
  return User.findOne({ email: req.body.email });
}

export function genarateToken(id) {
  return jwt.sign({ id }, process.env.SECRETKEY);
}

export function getUserById(userId) {
  return User.findById(userId).select("_id userName email");
}

export function getAllCustomer() {
  return User.find();
}
