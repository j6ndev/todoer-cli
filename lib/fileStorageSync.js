const fs = require('fs');
const { serializeJSON, parseJSON, handleError, prop } = require('./util');

const STORAGE_PATH = './todoer.json';
const INITIAL_STATE = { tasks: [] };

function createStorage() {
  if (!fs.existsSync(STORAGE_PATH)) {
    try {
      fs.writeFileSync(STORAGE_PATH, serializeJSON(INITIAL_STATE), 'utf8');
    } catch (error) {
      handleError(error);
    }
  }
}

function getData() {
  try {
    const data = fs.readFileSync(STORAGE_PATH, 'utf8');
    return data ? parseJSON(data) : parseJSON(INITIAL_STATE);
  } catch (error) {
    handleError(error);
  }
}

function readFromStore(key) {
  return prop(key, getData());
}

function writeToStore(key, data) {
  try {
    const allData = getData();
    const newData = { ...allData, [key]: data };
    fs.writeFileSync(STORAGE_PATH, serializeJSON(newData), 'utf8');
    return true;
  } catch (error) {
    handleError(error);
  }
}

module.exports = { createStorage, readFromStore, writeToStore };
