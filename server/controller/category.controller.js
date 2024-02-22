const Category = require('../models/category.model');
// const multer = require('multer');
// const storage = multer.storage("multer");
// Create a new category
const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      img,
      // basePrice,
      // perKmPrice,
      // capacity,
      // loadingTime,
      // dimensions,
      // helperStatus,
      sequence,
    } = req.body;
    const categoryExists = await Category.findOne({
      where: { name: name },
    });
    if (!categoryExists) {
      const sequenceExists = await Category.findOne({
        where: { sequence },
      });
      if (!sequenceExists) {
        const resp = await Category.create({
          name,
          description,
          img,
          // basePrice,
          // perKmPrice,
          // capacity,
          // loadingTime,
          // dimensions,
          // helperStatus,
          sequence,
        });
        if (resp) {
          res.status(200).json({
            status: "200",
            message: "Category added Successfully",
            response: resp,
          });
        }
      } else {
        return res
          .status(200)
          .json({ status: "400", message: "Sequence No. Already Exists" });
      }
    } else {
      return res
        .status(200)
        .json({ status: "400", message: "Category Already Exists" });
    }
  } catch (error) {
    return error.message == "Validation error"
      ? res
        .status(200)
        .json({ status: "500", message: "Category Already Exists" })
      : res.status(500).json({ status: "500", message: error.message });
  }
};



// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const pageSize = 20;
  let result=  await Category.find()
    return res.status(200).json({
      status: "200",
      message: "Get All Category Successfully",
      response: result || [],
      // count: count || 0,
    });
  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message });
  }
};



// Update a category
const updateCategory = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      img,
      // basePrice,
      // perKmPrice,
      // capacity,
      // loadingTime,
      // dimensions,
      // helperStatus,
      sequence,
    } = req.body;
    // console.log(id, "id id here");
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
          // basePrice,
          // perKmPrice,
          // capacity,
          // loadingTime,
          // dimensions,
          // helperStatus,
          sequence
        }
      );
    }
    return res.status(200).json({ status: "200", message: "Category updated successfully" });

  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message });
  }
};



// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    console.log("Category ID:", categoryId);

    // Check if the category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ status: "404", message: "Category not found" });
    }

    // Delete the category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(500).json({ status: "500", message: "Failed to delete category" });
    }

    console.log("Deleted category:", deletedCategory); // Logging deleted category for debugging
    return res.status(200).json({ status: "200", message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error); // Logging error for debugging
    return res.status(500).json({ status: "500", message: error.message });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
};

