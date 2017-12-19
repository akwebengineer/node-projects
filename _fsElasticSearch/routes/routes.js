const express = require('express');
const elastic = require('../elastic/main.js');
const bodyParser = require('body-parser');
const recursive = require('recursive-readdir');

const app = express();

const init = () => {
    app.listen(3000, () => {
        console.log("App started on port 3000");
    });
}


app.use(express.static('public'));

// app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.send()
});

app.get('/fileNameFragment/:fnf', function (req, res) {
    const reqParams = req.params;

    // Factor out logic from routes
    let files = elastic.searchFiles(reqParams.fnf);

    files.then((data) => {
        data.hits.hits.map((_data) => {
            console.log(_data._source.file);
        });
        res.send(data);
    }).catch((err) => {
        console.log("Error Occured...");
        console.log(err);
        res.end(err)
    });
})

app.post('/startIndex',jsonParser, (req, res) => {
    // const dir = req.body.directory;

    return res.send(req.body);

    // recursive(dir, function (err, files) {
    //     // `files` is an array of absolute file paths 
    //     // console.log(files);
    //     files.map((file) => {
    //         elastic.addDocumentsToIndex({ file }, 'filesystem', 'indexedFiles');
    //     });
    //     res.send(`${files.length} files added to index`);
    // });


});

module.exports = {
    init
};