// const express = require('express');
// const router = express.Router();
const categoryController = require('../controller/category.controller');
module.exports = function route(app) {

    
app.post('/api/createCategory', categoryController.createCategory);
app.get('/api/getallCategory', categoryController.getAllCategory);
app.put('/api/updateCategory/:id', categoryController.updateCategory);
app.delete('/api/deleteCategory/:id', categoryController.deleteCategory);
// app.get('/api/getCategory', categoryController.getCategoryById);




// module.exports = router;
}
