require('dotenv').config();
const { Sequelize } = require('sequelize');

/**
 * Sequelize instance for connecting to the PostgreSQL database.
 *
 * @type {import('sequelize').Sequelize}
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
  }
);

module.exports = sequelize;
