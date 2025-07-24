require('dotenv').config();
const { Sequelize } = require('sequelize');

/**
 * Sequelize instance for connecting to the PostgreSQL database.
 *
 * @type {import('sequelize').Sequelize}
 */
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASS,
  {
    dialect: process.env.POSTGRES_DIALECT,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    logging: false,
  }
);

module.exports = sequelize;
