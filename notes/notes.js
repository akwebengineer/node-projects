
console.log('starting notes.js');


const fs = require('fs');

const fetchNotes = () => {
    try {        
        return JSON.parse(fs.readFileSync('notes-data.json'));
    }
    catch(e){
        return [];
    }

}

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));        
}

const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    let duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => {
    return fetchNotes();
}

module.exports = {
    addNote,
    getAll
};