const passwords = require("../../src/constants/passwords");

exports.seed = function (knex) {
  return knex("passwords").del()
    .then(() => knex("passwords").insert(passwords));
};
