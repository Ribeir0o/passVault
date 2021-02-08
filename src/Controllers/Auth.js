const messages = require("../constants/errorMessages");
const { hash, compare } = require("../lib/bcrypt");
const { sign } = require("../lib/jwt");
const User = require("../Models/User");

class AuthController {
  async postRegister(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(messages.emptyField.status)
        .json(messages.emptyField);
    }

    try {
      const user = await User.findByEmail(email);
      if (user) {
        return res.status(messages.emailAlreadyExists.status).json(messages.emailAlreadyExists);
      }
      const hashedPassword = await hash(password);
      await User.create(email, hashedPassword);
      return res.sendStatus(201);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  async postLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(messages.emptyField.status)
        .json(messages.emptyField);
    }
    try {
      const user = await User.findByEmail(email);
      const isValid = await compare(password, user.password);
      if (isValid) {
        const token = sign(email);
        res.setHeader("Set-Cookie", `tkn=${token}; HttpOnly`);
        return res.sendStatus(200);
      }
      return res.status(messages.loginFailed.status).json(messages.loginFailed);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  }
}

module.exports = new AuthController();
