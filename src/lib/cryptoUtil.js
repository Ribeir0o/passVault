const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-gcm";

exports.encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, process.env.CIPHER_KEY, iv);
  const encrypted = cipher.update(text);
  return iv.toString("hex") + encrypted.toString("hex");
};

exports.decrypt = (encryptedMessage) => {
  const message = encryptedMessage.slice(32);
  const messageIv = encryptedMessage.slice(0, 32);
  const iv = Buffer.from(messageIv, "hex");
  const encryptedData = Buffer.from(message, "hex");

  const decipher = crypto.createDecipheriv(algorithm, process.env.CIPHER_KEY, iv);
  const decrypted = decipher.update(encryptedData);
  return decrypted.toString();
};
