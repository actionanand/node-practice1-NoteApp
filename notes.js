const fs = require('fs');
const chalk = require('chalk');


const danger = chalk.red;
const success = chalk.green;

const getNotes = function() {
    return 'your notes...'
}

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplNote = notes.filter((note) => {
        return note.title === title;
    });

    if(duplNote.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(success('Note add successfully!'))
    } else {
        console.log('Title ' + danger.bold.inverse(`${title}`) + danger(' already exists!'))
    }
    
}

const remNote = function(title) {
    const notes = loadNotes();
    if(notes.length > 0) {
        const updatedNotes = notes.filter((note) => {
            return note.title !== title;
        });
        saveNotes(updatedNotes);
        if(notes.length === updatedNotes.length) {
            console.log(danger.bold.inverse(`${title}`) + ' is not found!');
        } else {
          console.log(success.bold.inverse(`${title}`) +' is removed!')  
        }
    } else {
        console.log(danger.bold('Notes file is empty!'));
    }
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(err) {
        console.log('Created new ' + success.bold.inverse('notes.json') + ' file!');
        return [];
    }
}

const saveNotes = function(notes) {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    remNote: remNote
}