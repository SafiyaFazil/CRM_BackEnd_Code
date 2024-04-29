import express from "express";
import bcrypt from "bcrypt";
import {
  genarateToken,
  getAllCustomer,
  getUserByEmail,
} from "../Controllers/user.controller.js";
import { User } from "../Models/user.schema.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = await getUserByEmail(req);
    if (user) {
      return res.status(400).json({ Error: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(("hashedPassword", hashedPassword));
    user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    const token = genarateToken(user._id);
    res.status(201).json({ Message: "Successfully Registered", token });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await getUserByEmail(req);
    if (!user) {
      return res.status(404).json({ Error: "Invalid Authentication" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json({ Error: "Invalid Authentication" });
    }
    const token = genarateToken(user._id);
    res.status(200).json({ Message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.get("/cusAll", async (req, res) => {
  try {
    const customer = await getAllCustomer();
    if (customer.length <= 0) {
      res.status(404).json({ Error: "No data available" });
    }
    res.status(200).json({ data: customer });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

export const userRouter = router;
