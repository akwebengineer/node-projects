
const recursive = require('recursive-readdir');


const routes = require('./routes/routes.js');


const dirName = process.argv[2];




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

routes.init();