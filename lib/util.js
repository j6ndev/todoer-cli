const chalk = require('chalk');

const parseJSON = data => JSON.parse(data);
const serializeJSON = data => JSON.stringify(data, null, 2);

function handleError(error) {
  if (error.type !== 'EUSAGE' && error.message) {
    throw error;
  }
  error.message && console.error(chalk.redBright(error.message));
  process.exit(1);
}

module.exports = { parseJSON, serializeJSON, handleError };
