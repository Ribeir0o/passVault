const knex = require("../../db/index");

class User {
  async findByEmail(email) {
    const user = knex("users").select().where({ email }).first();
    return user;
  }

  async create(email, password) {
    return knex("users").insert({ email, password });
  }
}

module.exports = new User();
