const { encrypt } = require("../lib/cryptoUtil");
const User = require("../Models/User");
const Password = require("../Models/Password");
const messages = require("../constants/errorMessages");

class PasswordController {
  async postPassword(req, res) {
    const { email } = req;
    const { password, site } = req.body;
    const { id } = await User.findByEmail(email);

    if (!password || !site) return res.status(messages.emptyField.status).json(messages.emptyField);

    const encryptedPassword = encrypt(password);

    try {
      await Password.create(site, id, encryptedPassword);
      return res.sendStatus(201);
    } catch (e) {
      return res.sendStatus(500);
    }
  }
}

module.exports = new PasswordController();
