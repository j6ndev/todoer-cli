const fs = require('fs');
const { serializeJSON, parseJSON, handleError } = require('./util');

const STORAGE_PATH = './todoer.json';
const INITIAL_STATE = { tasks: [], tasksCount: 0 };

function createStorage() {
  if (!fs.existsSync(STORAGE_PATH)) {
    try {
      fs.writeFileSync(STORAGE_PATH, serializeJSON(INITIAL_STATE), 'utf8');
    } catch (error) {
      handleError(error);
    }
  }
}

function readFromStore() {
  try {
    const data = fs.readFileSync(STORAGE_PATH, 'utf8');
    return data ? parseJSON(data) : parseJSON(INITIAL_STATE);
  } catch (error) {
    handleError(error);
  }
}

function writeToStore(data) {
  try {
    fs.writeFileSync(STORAGE_PATH, serializeJSON(data), 'utf8');
  } catch (error) {
    handleError(error);
  }
}

module.exports = { createStorage, readFromStore, writeToStore };
