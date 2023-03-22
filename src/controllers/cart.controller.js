const { Cart } = require("../models/cart.model");
const responseHandler = require("../handlers/responseHandler");
const { default: mongoose } = require("mongoose");

const createCart = async (req, res) => {
  const { product, count, user } = req.body;

  try {
    const isProduct = await Cart.findOne({ product });

    if (!isProduct) {
      //@@@ create if  product not exits
      const cart = new Cart({
        product,
        count,
        user,
      });
      await cart.save();

      return responseHandler.create(res, cart);
    }
    //@@@ Update if  product  exits
    const cart = await Cart.findOneAndUpdate(
      {
        product,
      },
      {
        count: isProduct.count + count,
      },
      { new: true }
    );

    return responseHandler.ok(res, {
      cart,
      message: "Updated ",
    });
  } catch (error) {
    responseHandler.internal(res);
  }
};

const removeCart = async (req, res) => {
  const { _id } = req.query;

  try {
    const cart = await Cart.deleteOne({ _id });
    return responseHandler.ok(res, cart);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const updateCart = async (req, res) => {
  const { cartId, count, order } = req.body;

  try {
    const product = await Cart.findById(cartId);
    if (!product) return responseHandler.notFound(res);

    const cart = await Cart.findByIdAndUpdate(
      cartId,
      {
        count: count,
        order,
      },
      {
        new: true,
      }
    );

    return responseHandler.ok(res, cart);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const listCart = async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);

    responseHandler.ok(res, cart);
  } catch (error) {
    responseHandler.internal(res);
  }
};

module.exports = {
  createCart,
  removeCart,
  updateCart,
  listCart,
};
