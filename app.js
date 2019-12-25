const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

const success = chalk.bold.green;

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
      notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
        notes.remNote(argv.title);
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
