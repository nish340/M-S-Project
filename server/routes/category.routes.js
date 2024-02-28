// const express = require('express');
// const router = express.Router();
const categoryController = require('../controller/category.controller');
module.exports = function route(app) {
    const { verifyAdmin } = require('../Middleware/jwt.auth');


    app.post('/api/createCategory',verifyAdmin, categoryController.createCategory);
    app.get('/api/getallCategory',verifyAdmin, categoryController.getAllCategory);
    app.put('/api/updateCategory/:id',verifyAdmin, categoryController.updateCategory);
    app.delete('/api/deleteCategory/:id', verifyAdmin,categoryController.deleteCategory);
    // app.get('/api/getCategory', categoryController.getCategoryById);




    // module.exports = router;
}
