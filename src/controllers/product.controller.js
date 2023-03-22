const productModel = require("../models/product.model");
const responseHandler = require("../handlers/responseHandler");

const createProduct = async (req, res) => {
  const { sku, name, picturePath, description, quantity, price } = req.body;

  try {
    const product = await productModel.findOne({ sku });

    if (product) return responseHandler.badRequest(res, { message: "Product is  exits" });

    const newProduct = new productModel({
      sku,
      name,
      picturePath,
      description,
      quantity,
      price,
    });

    await newProduct.save();

    responseHandler.create(res, newProduct);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const updateProduct = async (req, res) => {
  const { sku, name, description, quantity, price } = req.body;

  try {
    const product = await productModel.findOneAndUpdate(
      { sku },
      {
        name,
        description,
        quantity,
        price,
      },
      {
        new: true,
      }
    );

    if (!product) return responseHandler.notFound(res);

    return responseHandler.ok(res, product);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const listProduct = async (req, res) => {
  try {
    const product = await productModel.find().sort("-createdAt");
    return responseHandler.ok(res, product);
  } catch (error) {
    responseHandler.internal(res, error.message);
  }
};

const singleProduct = async (req, res) => {
  const { sku } = req.params;
  try {
    const product = await productModel.findOne({ sku });
    if (!product) return responseHandler.notFound(res);
    return responseHandler.ok(res, product);
  } catch (error) {
    responseHandler.internal(res, error.message);
  }
};

const searchProduct = async (req, res) => {
  const { name } = req.query;

  try {
    const products = await productModel.aggregate([
      {
        $match: {
          name: { $regex: name.toString(), $options: "i" },
        },
      },
    ]);
    return responseHandler.ok(res, products);
  } catch (error) {
    responseHandler.internal(res, error.message);
  }
};

const removeProduct = async (req, res) => {
  const { sku } = req.query;

  try {
    const product = await productModel.findOneAndUpdate(
      { sku },
      {
        sale: false,
      },
      {
        new: true,
      }
    );

    if (!product) return responseHandler.notFound(res);

    return responseHandler.ok(res, product);
  } catch (error) {
    responseHandler.internal(res);
  }
};

// const searchCategory = async (req, res) => {
//   const { categoryId } = req.query;

//   try {
//     const products = await productModel.find({
//       category: categoryId,
//     });

//     responseHandler.ok(res, products);
//   } catch (error) {
//     responseHandler.internal(res);
//   }
// };

module.exports = {
  createProduct,
  updateProduct,
  singleProduct,
  listProduct,
  searchProduct,
  removeProduct,
};
