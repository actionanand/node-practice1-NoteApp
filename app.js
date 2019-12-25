const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

const success = chalk.bold.green;

const msg = getNotes();
// console.log(msg);
// console.log(success('Success!'));
// console.log(process.argv);
// console.log(yargs.argv);

// Customize yargs version
yargs.version('2.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note Title',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Note Body',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
        console.log('Title: ' +argv.title);
        console.log('Body: ' +argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing the note')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => {
        console.log('Listing out all notes')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note')
    }
})

// console.log(yargs.argv)
yargs.parse();
