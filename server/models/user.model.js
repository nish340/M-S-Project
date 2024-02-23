const mongoose = require("mongoose");
// const { INTEGER } = require("sequelize");
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
        phone: 
        { type: String,
        required: true
        },
        role: {
            type: String,
            enum: ['admin','user'], 
            default: 'user' 
                  }
        // token: {
        //     type: String,
        //     default: ''
        // },
        // designation: String
    },
    { versionKey: false, timestamps: true }
);

const user = mongoose.model("users", userModel);

module.exports = user;