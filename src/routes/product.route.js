const express = require("express");
const {
  createProduct,
  listProduct,
  singleProduct,
  updateProduct,
  removeProduct,
  searchProduct,
  searchCategory,
} = require("../controllers/product.controller");
const verifyToken = require("../middlewares/tokenMiddleware");

const router = express.Router();
router.post("/create", verifyToken, createProduct);

router.get("/list", listProduct);

router.get("/single/:sku", singleProduct);

router.put("/update", verifyToken, updateProduct);

router.put("/remove", verifyToken, removeProduct);

router.get("/list/search", searchProduct);

// router.get("/search/category", searchCategory);

module.exports = router;
