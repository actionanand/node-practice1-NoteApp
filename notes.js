const fs = require('fs');
const chalk = require('chalk');

const success = chalk.bold.green;

const getNotes = function() {
    return 'your notes...'
}

const addNote = function(title, body) {
    const notes = loadNotes();
    notes.push({
        title: title,
        body: body
    });
    saveNotes(notes);
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(err) {
        console.log('Created new ' + success.inverse('notes.json') + ' file!');
        return [];
    }
}

const saveNotes = function(notes) {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData);
    console.log(success('Note add successfully!'))
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}