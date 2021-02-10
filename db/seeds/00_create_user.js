const { hash } = require("../../src/lib/bcrypt");

exports.seed = async function (knex) {
  const user1Pass = await hash("strongPassword1");
  const user2Pass = await hash("strongPassword2");
  return knex("users").del()
    .then(() => knex("users").insert([
      { email: "thiagogr71@gmail.com", password: user1Pass },
      { email: "thiagog.r@hotmail.com", password: user2Pass },
    ]));
};
