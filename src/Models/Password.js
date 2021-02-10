const knex = require("../../db/index");

class Password {
  create(site, userId, encryptedPassword) {
    return knex("passwords").insert({ site, user_id: userId, password: encryptedPassword });
  }

  findById(id) {
    return knex("passwords").select("site", "user_id", "password").where({ id }).first();
  }

  deleteById(id) {
    return knex("passwords").where({ id }).delete();
  }

  updateById(id, newPassword, site) {
    return knex("passwords").where({ id }).update({ password: newPassword, site });
  }
}

module.exports = new Password();
