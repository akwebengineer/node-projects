console.log("starting app.js");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const command = process.argv[2];

// console.log(`Command: ${command}`);

const args = yargs.argv;

if (command === 'add'){    
   let note = notes.addNote(args.title, args.body);
   if (note) console.log(`Note with title "${note.title}" was added`);
   else {console.log(`Note with title "${args.title}" already exists`)};
}
else if (command === 'list'){
    notes.getAll();
}
else if (command === 'read'){
    console.log('Reading note');
}
else if (command === 'remove'){
    console.log('Removing note');
}
else {
    console.log('Command not found');
}
