const { verify } = require("../lib/jwt");
const messages = require("../constants/errorMessages");

// eslint-disable-next-line
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(messages.invalidToken.status);
    return res.json(messages.invalidToken);
  }
  const token = req.headers.authorization.trim().split(" ")[1];
  try {
    const { email } = verify(token);
    req.email = email;
    next();
  } catch (err) {
    res.status(messages.invalidToken.status);
    return res.json(messages.invalidToken);
  }
};
