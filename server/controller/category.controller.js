const { isRegExp } = require('util/types');
const Category = require('../models/category.model');
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: function(req, file, cb){
//     cb(null, Date.now() + file.originalname);
//   }

// }
// const upload = multer ({storage:storage});

// app.post ("./upload", upload.single('profileImage'), (req, res)=>{
//   console.log(req.file);
//   res.send(req.file);
// });

// Create a new category
const createCategory = async (req, res) => {
  try {
    const {
      name, description
    } = req.body;
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      return res.status(400).json({ status: "400", message: "Category Already Exists" });
    }
    const resp = await Category.create({
      name, description
    });
    return res.status(200).json({
      status: "200",
      message: "Category added Successfully",
      response: resp,
    });
  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message});
  }
};



// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.name) {
      query.name = { $regex:RegExp(req.query.name) }; 
    }else{
      // console.log("hit=======");
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    const result = await Category.find(query)
      .skip(skip)
      .limit(limit);
    const totalCount = await Category.countDocuments(query);
    return res.status(200).json({
      message: "Get All Category Successfully",
      res: result || [],
      totalCount: totalCount,
    });
  } catch (error) {
    return res.status(500).json({ status: "500", message: "Get All Category Failed" });
  }
};


// SearchApi
const searchCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const existingCategory = await Category.findById(categoryId);
    
    if (existingCategory) {
      const data = await Category.findById(categoryId);
      res.send(data);
      console.log(categoryId,"Hit=======================");
    } else {
      return res.status(404).json({ status: "404", message: "Category not found" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};




// Update a category
const updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, description,status } = req.body;
    const categoryExists = await Category.findOne({ _id: id }).select("id");
    if (!categoryExists) {
      return res.status(404).json({ status: "404", message: "Category not found" });
    } else {
      await Category.findByIdAndUpdate(
        { _id: id },
        {
          name, description,status
        },
        {
          new:true
        }
      );
    };
    return res.status(200).json({ status: "200", message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "500", message: error.message });
  }
};



// deleteAPI
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
  createCategory,  //add 
  updateCategory,  //update category
  getAllCategory,  //get all category
  deleteCategory,  //delete category
  searchCategory,  //search category
};

