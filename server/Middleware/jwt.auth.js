const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const SECRETKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRmMWExYTNjZGNhMTUyMzNhMjUxMWEiLCJpYXQiOjE3MDkxMjA2NjcsImV4cCI6MTcwOTEyNDI2N30";

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing", status: 401 });
    }
    const tokenString = token;
    console.log("Token:", tokenString);
    jwt.verify(tokenString, SECRETKEY, async (err, decoded) => {
      if (err) {
        console.log("Decoding error:", err);
        return res.status(401).json({ message: "Invalid token", status: 401 });
      } else {
        console.log("Decoded User ID:", decoded.userId);
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: "User not found", status: 401 });
        }
        console.log("User:", user);
        if (user.role !== "admin") {
          return res.status(403).json({ message: "Unauthorized access", status: 403 });
        }
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

module.exports = {
  verifyAdmin,
};
