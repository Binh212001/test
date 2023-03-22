const express = require("express");
const multer = require("multer");
const verifyToken = require("../middlewares/tokenMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/image");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.post("/upload/image", upload.single("picture"), verifyToken, (req, res, next) => {
  console.log(req.file);
});

module.exports = router;
