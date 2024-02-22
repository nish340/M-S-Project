const userController = require("../controller/user.controller")


module.exports = function Route(app) {
    app.post("/api/users/logIn", userController.logIn);
    app.post("/api/users/signUp", userController.signUp);
    // app.put("/api/users/edit", userController.update)
    // app.delete("/api/users/deleteById", userController.deleteById)
    // app.get("/api/users/findById", userController.findById)
    // app.get("/api/users/findAll", userController.findAll)
    // app.post("/users/forgot-password", userController.forgotPassword)
    // app.post("/api/users/reset-password", userController.reset_password)
}