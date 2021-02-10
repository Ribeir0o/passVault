const knex = require("../../db/index");

class Password {
  create(site, userId, encryptedPassword) {
    return knex("passwords").insert({ site, user_id: userId, password: encryptedPassword });
  }

  findById(id) {
    return knex("passwords").select("site", "user_id", "password").where({ id }).first();
  }
}

module.exports = new Password();
