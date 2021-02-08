const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sign = (email) => jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10h" });
