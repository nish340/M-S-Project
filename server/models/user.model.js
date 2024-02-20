const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: String,
        // role: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "roles"
        // },
        // token: {
        //     type: String,
        //     default: ''
        // },
        designation: String
    },
    { versionKey: false, timestamps: true }
);

const user = mongoose.model("users", userModel);

module.exports = user;