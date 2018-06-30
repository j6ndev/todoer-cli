#!/usr/bin/env node
const { createStorage } = require('../lib/fileStorageSync');
const main = require('../lib/main');

const args = process.argv.slice(2);

createStorage();
main(args);
