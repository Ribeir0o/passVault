const knex = require("../../db/index");

class Password {
  create(site, userId, encryptedPassword) {
    return knex("passwords").insert({ site, user_id: userId, password: encryptedPassword });
  }
}

module.exports = new Password();
