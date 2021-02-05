require("dotenv").config();

module.exports = {

  development: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_HOST,
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
      filename: "./test.sqlite",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
