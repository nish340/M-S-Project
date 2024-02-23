const Category = require('../models/category.model');
// Create a new category

const createCategory = async (req, res) => {
  try {
    const {
      name, description, img,
    } = req.body;
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      return res.status(400).json({ status: "400", message: "Category Already Exists" });
    }
    // const sequenceExists = await Category.findOne({ sequence: sequence });
    // if (sequenceExists) {
    //   return res.status(400).json({ status: "400", message: "Sequence Already Exists" });
    // }
    const resp = await Category.create({
      name, description, img,
    });
    return res.status(200).json({
      status: "200",
      message: "Category added Successfully",
      response: resp,
    });
  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message });
  }
};


// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const result = await Category.find().skip(skip).limit(limit);
    const totalCount = await Category.countDocuments();
    return res.status(200).json({
      status: "200",
      message: "Get All Category Successfully",
      response: result || [],
      totalCount: totalCount,
    });
  } catch (error) {
    return res.status(500).json({ status: "500", message: "Get All Category Failed" });
  }
};


// Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      img,
    } = req.body;
    const categoryExists = await Category.findOne({ _id: id }).select("id");
    if (!categoryExists) {
      return res.status(404).json({ status: "404", message: "Category not found" });
    } else {
      await Category.findByIdAndUpdate(
        { _id: id },
        {
          name,
          description,
          img,
        }
      );
    }
    return res.status(200).json({ status: "200", message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ status: "404", message: "Category not found" });
    } else {
      await Category.findByIdAndDelete(categoryId);
      return res.status(200).json({ status: "200", message: "Category deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message });
  }
};



module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
};

