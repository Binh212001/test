const responseHandler = require("../handlers/responseHandler");
const categoryModel = require("../models/category.model");
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new categoryModel({ name });
    await category.save();
    responseHandler.create(res, category);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const removeCategory = async (req, res) => {
  const { id } = req.query;
  try {
    const categoryDeleted = await categoryModel.deleteById(id);
    responseHandler.ok(res, categoryDeleted);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const updateCategory = async (req, res) => {
  const { name, id } = req.body;
  try {
    const categoryUpdated = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );
    responseHandler.ok(res, categoryUpdated);
  } catch (error) {
    responseHandler.internal(res);
  }
};

const listCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    responseHandler.ok(res, categories);
  } catch (error) {
    responseHandler.internal(res);
  }
};
module.exports = {
  createCategory,
  removeCategory,
  updateCategory,
  listCategory,
};
