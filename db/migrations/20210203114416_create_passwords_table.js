exports.up = (knex) => knex.schema.createTable("passwords", (table) => {
  table.increments();
  table.integer("user_id")
    .unsigned()
    .notNullable();
  table.string("site");
  table.string("password");

  table.foreign("user_id")
    .references("id")
    .inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable("passwords");
