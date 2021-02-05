const messages = require("../constants/errorMessages");
const { hash } = require("../lib/bcrypt");
const User = require("../Models/User");

class AuthController {
  async postRegister(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(messages.emptyField.status)
        .json(messages.emptyField);
    }

    const user = await User.findByEmail(email);
    if (!user) {
      const hashedPassword = await hash(password);
      await User.create(email, hashedPassword);
      return res.sendStatus(201);
    }
    return res.status(messages.emailAlreadyExists.status).json(messages.emailAlreadyExists);
  }
}

module.exports = new AuthController();
