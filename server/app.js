const express = require("express");
const app = express();
require("dotenv").config();
require("../server/config/db.config");
const cors = require("cors");
var bodyParser = require('body-parser');

var corsOptions = {
    origin: "http://localhost:3000", 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
require("./routes/index")(app)

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, () => {
    console.log(`app is running on ${host}${port}`)
});
