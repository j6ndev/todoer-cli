const chalk = require('chalk');
const Table = require('cli-table');

const parseJSON = data => JSON.parse(data);
const serializeJSON = data => JSON.stringify(data, null, 2);

const prop = (key, obj) => obj[key];

const generateID = () => new Date().getTime();

function handleError(error) {
  if (error.type !== 'EUSAGE' && error.message) {
    throw error;
  }
  error.message && console.error(chalk.redBright(error.message));
  process.exit(1);
}

const table = new Table({
  head: ['ID', 'TODO', 'DONE'],
  colors: true,
  colWidths: [25, 40, 10],
  style: { head: ['yellow'] }
});

module.exports = {
  parseJSON,
  serializeJSON,
  handleError,
  table,
  prop,
  generateID
};
