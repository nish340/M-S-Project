const User = require("../models/user.model");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { createSecretKey } = require("crypto");
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');


// signUp
const saltRounds = 10; 
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).json({ message: `All fields are required`, status: 400 });
    }
    const userExist = await User.findOne({ email,name });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists", status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await new User({ name, email, password: hashedPassword }).save();

    return res.status(200).json({ message: "User registered successfully!", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};




// loginform
const logIn = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!(name && password)) {
      return res.status(400).json({ message: "Both name and password are required", status: 400 });
    }
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials", status: 401 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials", status: 401 });
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successfull", user, token, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};




// forgotPassword
// const forgotPassword = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const user = await User.findOne({ name });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found', status: 404 });
//     }

//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetToken = token;
//     await user.save();

//     const transporter = nodnameer.createTransport({
//       service: 'Gmail',
//       auth: {
//           user: 'mailto:your-name@gmail.com',
//           pass: 'your-password'
//       }
//     });

//     const mailOptions = {
//       from: 'mailto:your-name@gmail.com',
//       to: user.name,
//       subject: 'Password Reset Request',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
//         + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//         + `http://localhost:3000/reset-password/${token}\n\n`
//         + `If you did not request this, please ignore this name and your password will remain unchanged.\n`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Error sending reset name', status: 500 });
//       } else {
//         console.log('name sent:' + info.response);
//         return res.status(200).json({ message: 'Reset password name sent', status: 200 });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message, status: 500 });
//   }
// };


module.exports = {
  signUp,
  // forgotPassword,
  logIn
};
