require("dotenv").config();

module.exports = {

  development: {
    client: "mysql2",
    connection: {
      host: "172.20.0.3",
      database: "passmngr",
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
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
