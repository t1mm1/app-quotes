const sequelize = require('./database');

/**
 * Synchronizes all defined models to the DB.
 *
 * @async
 * @function sync
 * @returns {Promise<void>}
 * @throws Will throw an error if database sync fails.
 */
const sync = async () => {
  try {
    await sequelize.sync();
    console.log(`DB was synchronized.`);
  } catch (error) {
    console.error(`Unable to sync DB:`, error);
    throw error;
  }
};

/**
 * Resets the auto-increment sequences of Quotes and Categories IDs
 * so they point to the max current id in those tables.
 *
 * @async
 * @function reset
 * @returns {Promise<void>}
 */
const reset = async () => {
  try {
    await sequelize.query(
      `SELECT setval('"Quotes_id_seq"', (SELECT MAX(id) FROM "Quotes"));`
    );
    await sequelize.query(
      `SELECT setval('"Categories_id_seq"', (SELECT MAX(id) FROM "Categories"))`
    );

    console.log(`Quotes and Categories ID Sequences were reset.`);
  } catch (error) {
    console.error(`Unable to reset ID sequences:`, error);
  }
};

/**
 * Initializes the database: synchronizes models and resets sequences.
 *
 * @async
 * @function init
 * @returns {Promise<void>}
 */
module.exports.init = async () => {
  await sync();
  await reset();
};
