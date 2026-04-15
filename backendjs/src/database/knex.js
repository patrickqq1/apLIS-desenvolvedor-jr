const { config } = require("../config/env");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
  },
  pool: {
    min: 0,
    max: 7,
  },
});

module.exports = db;
