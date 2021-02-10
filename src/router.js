const express = require("express");

const AuthController = require("./Controllers/Auth");
const PasswordController = require("./Controllers/Password");

const jwtMiddleware = require("./Middlewares/validateJWT");

const router = express.Router();

router.post("/account", AuthController.postRegister);
router.post("/login", AuthController.postLogin);

router.get("/passwords", jwtMiddleware, PasswordController.getAllPasswords);
router.post("/password", jwtMiddleware, PasswordController.postPassword);
router.get("/password/:id", jwtMiddleware, PasswordController.getOnePassword);
router.delete("/password/:id", jwtMiddleware, PasswordController.deletePassword);
router.put("/password/:id", jwtMiddleware, PasswordController.putPassword);

module.exports = router;
