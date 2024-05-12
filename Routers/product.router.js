import express from "express";
import {
  deleteProduct,
  getSearchProduct,
  getUserProduct,
  postNewProduct,
  updateProduct,
} from "../Controllers/product.controller.js";

const router = express.Router();


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

router.get("/user/all", async (req, res) => {
  try {
    const product = await getUserProduct(req);
    if (product.length <= 0) {
      res.status(404).json({ Error: "No data available" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.post("/user/add", async (req, res) => {
  try {
    const newProduct = await postNewProduct(req);
    if (!newProduct) {
      return res.status(400).json({ error: "Error uploading Data" });
    }
    return res
      .status(200)
      .json({ data: newProduct, message: "Notes Saved Successfully" });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.put("/user/edit/:id", async (req, res) => {
  try {
    const updateOperation = await updateProduct(req);
    if (!updateOperation) {
      return res.status(400).json({ error: "Error updating Data" });
    }
    return res
      .status(201)
      .json({ data: updateOperation, message: "Notes Updated Successfully" });
  } catch (error) {
    res.status(500), json({ Error: "Internal Server Error" });
  }
});

router.delete("/user/delete/:id", async (req, res) => {
  try {
    const deleteOperation = await deleteProduct(req);
    if (!deleteOperation) {
      return res.status(400).json({ error: "Error Deleting Data" });
    }
    return res.status(200).json({
      message: "Notes Deleted Successfully",
    });
  } catch (error) {
    res.status(500), json({ Error: "Internal Server Error" });
  }
});

export const productRouter = router;
