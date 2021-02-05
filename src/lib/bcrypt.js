const bcrypt = require("bcryptjs");

exports.hash = async (password) => {
  const salt = 8;
  const hash = bcrypt.hash(password, salt);
  return hash;
};

exports.compare = async (password, hash) => {
  const res = bcrypt.compare(password, hash);
  return res;
};
