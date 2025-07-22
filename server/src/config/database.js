const { Sequelize } = require('sequelize');

/**
 * Sequelize instance for connecting to the PostgreSQL database.
 *
 * Database: 'db'
 * Username: 'admin'
 * Password: 'admin_password'
 * Host: 'localhost'
 * Port: 5432
 * Dialect: 'postgres'
 * Logging: false
 *
 * @type {import('sequelize').Sequelize}
 */
const sequelize = new Sequelize('db', 'admin', 'admin_password', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  logging: false,
});

module.exports = sequelize;
