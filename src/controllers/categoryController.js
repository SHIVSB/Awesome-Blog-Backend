const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbID");
const Category = require("../models/category");
const categoryController = {};

categoryController.createCategory = expressAsyncHandler(async (req, res) => {
  const { title } = req.body;

  try {
    const category = await Category.create({
      user: req.user._id,
      title,
    });

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).send("Error in creatig the category");
  }
});

categoryController.fetchallcategories = expressAsyncHandler(
  async (req, res) => {
    try {
      const categories = await Category.find({})
        .populate("user")
        .sort("-createdAt");

      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send("Error in fetching all categories");
    }
  }
);

categoryController.fetchSingleCategory = expressAsyncHandler(
  async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id)
        .populate("user")
        .sort("-createdAt");

      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send("Error in fetching the category");
    }
  }
);

categoryController.updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).send("Error in updating the category");
  }
});

categoryController.deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);

    return res.status(200).send("Category deleted successfully");
  } catch (error) {
    return res.status(500).send("Error in deleting the category");
  }
});

module.exports = categoryController;
