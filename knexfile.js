// Update with your config settings.
require("dotenv").config();

module.exports = {

  development: {
    client: "mysql2",
    connection: {
      database: "passmngr",
      user: "root",
      password: process.env.MYSQL_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
