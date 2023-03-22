const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// // Cart Item Schema
// const CartItemSchema = new Schema({
//   product: {
//     type: Schema.Types.ObjectId,
//     ref: "Product",
//   },
//   quantity: Number,

//   totalPrice: {
//     type: Number,
//     default: 0,
//   },
// });

// const cartItem = Mongoose.model("CartItem", CartItemSchema);

// Cart Schema
const CartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    count: Number,
    order: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = Mongoose.model("Cart", CartSchema);
module.exports = { Cart };
