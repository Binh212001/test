const express = require("express");
const { login, signup, updateUser } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/tokenMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/update", verifyToken, updateUser);

module.exports = router;
