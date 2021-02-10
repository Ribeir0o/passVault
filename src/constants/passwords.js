const { encrypt } = require("../lib/cryptoUtil");

const firstPass = encrypt("facebookPassUser1");
const secondPass = encrypt("facebookPassUser1");
const thirdPass = encrypt("facebookPassUser2");
module.exports = [
  { site: "https://www.facebook.com", password: firstPass, user_id: 1 },
  { site: "https://www.orkut.com", password: secondPass, user_id: 1 },
  { site: "https://www.facebook.com", password: thirdPass, user_id: 2 },
];
