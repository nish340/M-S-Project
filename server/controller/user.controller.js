const User = require("../models/user.model");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRET_ACCESS_TOKEN;
const auth = require('../Middleware/jwt.auth');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
 


// signUpAPI
const saltRounds = 20;

const signUp = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!(name && email && phone && password && role)) {
      return res.status(400).json({ message: `All fields are required`, status: 400 });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists", status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await new User({ name, email, phone, password: hashedPassword, role });
    const result = await User.create({
      name:name,
      email:email,
      phone:phone,
      password: hashedPassword
    })
    const token = jwt.sign({ email:result.email,id:result._id}, SECRETKEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ User: result,token:token, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
// module.exports = signUp;



// loginformAPI
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
    const token = jwt.sign({ userId: user._id }, SECRETKEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successfull", user: {_id: user._id, name: user.name, phone:user.phone, role: user.role }, token, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};




// forgotPasswordAPI
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.send({ status: "User not existed" });
//     }
//     const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1h" });
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'shubhamrwt789@gmail.com',
//         pass: 'your password'
//       }
//     });
//     const mailOptions = {
//       from: 'shubhamrwt789@gmail.com',
//       to: user.email, 
//       subject: 'Reset Password Link',
//       text: `BASE_URL/reset_password/${user._id}/${token}`
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         return res.status(500).send({ status: "Error sending email" });
//       } else {
//         return res.send({ status: "Success" });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ status: "Internal server error" });
//   }
// };




module.exports = {
signUp,
logIn,
  // forgotPassword
};
