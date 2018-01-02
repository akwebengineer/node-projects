
// const recursive = require('recursive-readdir');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'index.html')));
app.root = __dirname;

require('./routes/routes.js')(app);


const dirName = process.argv[2];



const init = () => {
    app.listen(3000, () => {
        console.log("App started on port 3000");
    });
}

// function findFilesAndIndex(directory) {
//     recursive(directory, function (err, files) {
//         // `files` is an array of absolute file paths 
//         console.log(files.length);
//             elastic.addDocumentsToIndex({file: files}, 'filesystem', 'indexedFiles');
        
//         // files.map((file)=>{
//         //     elastic.addDocumentsToIndex({file}, 'filesystem', 'indexedFiles');
//         // });
//       });
// }

// findFilesAndIndex(dirName);



// let files = elastic.searchFiles('license');

// files.then((data)=>{    
//     data.hits.hits.map((_data)=>{
//                 console.log(_data._source.file);
//             });
// }).catch((err) => {
//     console.log("Error Occured...");
//     console.log(err);
// });

init();