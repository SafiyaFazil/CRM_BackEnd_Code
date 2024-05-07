import express from "express";
import { Admin } from "../Models/admin.schema.js";
import { genarateToken, getAllProduct, getSearchProduct } from "../Controllers/admin.controller.js";

const router = express.Router();

router.post("/adminLogin", async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;
    const admin = await Admin.findOne({ adminEmail });
    const token = genarateToken(admin._id);
    if (admin && admin.adminPassword === adminPassword) {
      return res.status(200).json({ Message: "Login Successfully" , token});
    } else {
      return res.status(404).json({ Error: "Invalid Authentication" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Internal Server Error", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const product = await getAllProduct();
    if (product.length <= 0) {
      res.status(404).json({ Error: "No data available" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500), json({ Error: "Internal Server Error" });
  }
});


router.get("/search", async (req, res) => {
  try {
    const item = req.body.productName;
    const product = await getSearchProduct(item);
    console.log(product);
    if (product.length <= 0) {
      res.status(404).json({ Error: "No data available" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});


export const adminRouter = router;
