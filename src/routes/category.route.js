const express = require("express");
const { listCategory, createCategory, updateCategory } = require("../controllers/category.controller");
const router = express.Router();
const tokenMiddleware = require("../middlewares/tokenMiddleware");

router.get("/list", listCategory);
router.post("/create", createCategory);
router.put("/update", updateCategory);
// router.delete("/remove", removeCategory);

module.exports = router;
