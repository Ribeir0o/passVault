const express = require("express");

const AuthController = require("./Controllers/Auth");

const router = express.Router();

router.post("/account", AuthController.postRegister);

module.exports = router;
