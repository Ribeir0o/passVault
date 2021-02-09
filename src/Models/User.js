const knex = require("../../db/index");

class User {
  findByEmail(email) {
    const user = knex("users").select().where({ email }).first();
    return user;
  }

  create(email, password) {
    return knex("users").insert({ email, password });
  }
}

module.exports = new User();
