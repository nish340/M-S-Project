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
        phone: 
        { type: String,
        required: true
        },
        role: {
            type: String,
            enum: ['admin','user'], 
                  },
        // token:
        // {
        //     type: String,
        //     required: true
        // }          
    },
    { versionKey: false, timestamps: true }
);

const user = mongoose.model("users", userModel);

module.exports = user;