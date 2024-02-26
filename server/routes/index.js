module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    require("./user.routes")(app)
    // require("./warehouse.route")(app)
    // require("./commodity.routes")(app)
    // require("./unit.routes")(app)
    // require("./vendor.route")(app)    
    // require("./inbound.routes")(app)
    // require("./outbound.routes")(app)
    // require("./new_Product.routes")(app)
    // require("./dashboard.route")(app)
    // require("./account.routes")(app)
}
