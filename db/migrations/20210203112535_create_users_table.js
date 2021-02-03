exports.up = (knex) => knex.schema.createTable("users", (table) => {
  table.increments();
  table.string("email");
  table.string("password");
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable("users");
