const fs = require('fs');
const chalk = require('chalk');


const danger = chalk.red;
const success = chalk.green;

const getNote = (title)=> {
    const notes = loadNotes();
    const note = notes.find((note) => note.title===title);

    if(note) {
        console.log(success.bold.inverse(note.title));
        console.log(success.italic(note.body));
    } else {
        console.log(danger.bold.inverse(title) + ' not found!');
    }
}

const addNote = function(title, body) {
    const notes = loadNotes();
    // const duplNotes = notes.filter((note) => note.title === title ); //=> will return the result
    const duplNote = notes.find((note) => note.title === title);

    if(!duplNote) {
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

const remNote = (title) => {
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

const listNotes = () => {
    const notes = loadNotes(); 
    if(notes.length > 0) {
        console.log(success.bold.inverse('Your notes: '));
        let count = 1;
        notes.forEach(note => {
            console.log(success(`${count} ${note.title}`));
            count++;
        });
    } else {
        console.log(danger.bold('Notes file is empty!')); 
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(err) {
        console.log('Created new ' + success.bold.inverse('notes.json') + ' file!');
        return [];
    }
}

const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData);
}


module.exports = {
    getNote: getNote,
    addNote: addNote,
    remNote: remNote,
    listNotes: listNotes
}