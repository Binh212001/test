const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Product Schema
const ProductSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    picturePath: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    sale: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Product", ProductSchema);
