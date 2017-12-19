console.log("starting app.js");
// built-in node modules
const fs = require('fs');
// 3rd party node modules
const _ = require('lodash');
const yargs = require('yargs');
// custom modules
const notes = require('./notes.js');
// custom variables
const command = process.argv[2];
const args = yargs.argv;

if (command === 'add'){    
   let note = notes.addNote(args.title, args.body);
   if (note) console.log(`Note with title "${note.title}" was added`);
   else {console.log(`Note with title "${args.title}" already exists`)};
}
else if (command === 'list'){
    console.log(notes.getAll());
}
else if (command === 'read'){
    console.log('Reading note');
}
else if (command === 'remove'){
    const removed = notes.removeNote(args.title);
    const message = (removed)? "Note was removed" : "Note was not removed";
    console.log(message);
}
else {
    console.log('Command not found');
}
