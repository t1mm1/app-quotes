/**
 * Application entry point.
 * Loads environment variables, initializes database, and starts the Express server.
 */

require('dotenv').config();
const sync = require('./src/config/init');
const app = require('./src/app');

/**
 * Starts the application.
 * - Initializes the database connection.
 * - Starts the Express server on the specified port.
 * - Handles errors during startup.
 *
 * @async
 * @function start
 * @returns {Promise<void>}
 */
const start = async () => {
  try {
    await sync.init();

    const port = process.env.BACKEND_PORT || 3001;
    const host = process.env.BACKEND_HOST || '0.0.0.0';
    app.listen(port, host, () => {
      console.log(`Server was started on ${port} port.`);
    });
  } catch (error) {
    console.error(`Unable to sync DB:`, error);
  }
};

start();
