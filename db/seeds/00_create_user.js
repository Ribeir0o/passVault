const { hash } = require("../../src/lib/bcrypt");

exports.seed = async function (knex) {
  const password = await hash("strongPassword");
  return knex("users").del()
    .then(() => knex("users").insert([
      { email: "thiagogr71@gmail.com", password },
    ]));
};
