const { encrypt, decrypt } = require("../lib/cryptoUtil");
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

  async getOnePassword(req, res) {
    const { id } = req.params;
    const { email } = req;
    // eslint-disable-next-line
    if (isNaN(id)) return res.status(messages.idMustBeNumber.status).json(messages.idMustBeNumber);
    try {
      const password = await Password.findById(id);
      const user = await User.findByEmail(email);

      if (user.id !== password.user_id) {
        return res
          .status(messages.idNotFound.status)
          .json(messages.idNotFound);
      }

      const decryptedPass = decrypt(password.password);

      return res.status(200).json({ site: password.site, password: decryptedPass });
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  async deletePassword(req, res) {
    const { email } = req;
    const { id } = req.params;

    // eslint-disable-next-line
    if (isNaN(id)) return res.status(messages.idMustBeNumber.status).json(messages.idMustBeNumber);

    try {
      const password = await Password.findById(id);
      const user = await User.findByEmail(email);

      if (user.id !== password.user_id) {
        return res
          .status(messages.idNotFound.status)
          .json(messages.idNotFound);
      }

      await Password.deleteById(id);
      return res.sendStatus(200);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  async putPassword(req, res) {
    const { email } = req;
    const { newPassword, site } = req.body;
    const { id } = req.params;

    // eslint-disable-next-line
    if (isNaN(id)) return res.status(messages.idMustBeNumber.status).json(messages.idMustBeNumber);

    if (!newPassword || !site) {
      return res
        .status(messages.emptyField.status)
        .json(messages.emptyField);
    }

    try {
      const password = await Password.findById(id);
      const user = await User.findByEmail(email);

      if (user.id !== password.user_id) {
        return res
          .status(messages.idNotFound.status)
          .json(messages.idNotFound);
      }
      const encryptedNewPass = encrypt(newPassword);
      await Password.updateById(id, encryptedNewPass, site);
      return res.sendStatus(200);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  }
}

module.exports = new PasswordController();
