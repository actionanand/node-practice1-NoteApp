const chalk = require('chalk');
const getNotes = require('./notes.js')
const success = chalk.bold.inverse.green;

const msg = getNotes()
console.log(msg);

console.log(success('Success!'));
