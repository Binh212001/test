const userModel = require("../models/user.model");
const responseHandler = require("../handlers/responseHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const TOKEN_SECRET = "qudqwejhqwehj";

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) responseHandler.badRequest(res, "Lack data");
    const user = await userModel.findOne({ email });
    // Thong bao user da ton tai
    if (user) return responseHandler.badRequest(res, { message: "Username or password was existed" });
    // tao user

    const slat = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, slat);
    const newUser = new userModel({
      email,

      password: hashPass,
    });

    await newUser.save();

    const token = jwt.sign({ email, password }, TOKEN_SECRET);

    responseHandler.create(res, { token, ...newUser._doc });
  } catch (error) {
    responseHandler.internal(res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) return responseHandler.badRequest(res, "User not exist");

    const decodedPass = await bcrypt.compare(password, user.password);

    if (!decodedPass) return responseHandler.badRequest(res, { message: "Username or password invalid" });

    user.password = undefined;

    const token = jwt.sign({ email, password }, TOKEN_SECRET);

    responseHandler.ok(res, { token, ...user._doc });
  } catch (error) {
    responseHandler.internal(res);
  }
};

const updateUser = async (req, res) => {
  const { _id, email, displayName, address, phoneNumber, avatar, isAdmin } = req.body;

  try {
    const user = await userModel.findById(_id);

    if (!user) {
      return responseHandler.notFound(res);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,

      {
        displayName,
        address,
        phoneNumber,
        avatar,
        isAdmin,
      },
      {
        new: true,
      }
    );

    updatedUser._doc.password = undefined;

    return responseHandler.ok(res, {
      ...updatedUser._doc,
    });
  } catch (error) {
    responseHandler.internal(res);
  }
};

module.exports = { login, signup, updateUser, TOKEN_SECRET };
