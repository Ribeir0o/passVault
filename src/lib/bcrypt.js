const bcrypt = require("bcryptjs");

exports.hash = (password) => {
  const salt = 8;
  const hash = bcrypt.hash(password, salt);
  return hash;
};

exports.compare = (password, hash) => {
  const res = bcrypt.compare(password, hash);
  return res;
};
