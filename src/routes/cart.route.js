const express = require("express");
const { createCart, removeCart, updateCart, listCart } = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/tokenMiddleware");

const router = express.Router();

router.post("/create", verifyToken, createCart);

router.delete("/remove", verifyToken, removeCart);

router.get("/list", verifyToken, listCart);

router.put("/update", verifyToken, updateCart);

module.exports = router;
