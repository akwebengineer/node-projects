const routes = function(app) {

    const bodyParser = require('body-parser');
    const recursive = require('recursive-readdir');
    const path = require('path');
    
    const fsInterface = require('../modules/fsInterface.js');
    
        
    
    // app.use(bodyParser.json());       // to support JSON-encoded bodies
    // app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    //     extended: true
    // }));
    
    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    
    
    // ALL ROUTES
    
    //default route
    app.get('/', (req, res) => {
        res.type('.html');
        return res.sendFile(path.join(app.root, 'index.html'));
    });
    
    //directory content route
    app.get('/readDir', (req,res) => {
        const dirName = req.query.dirName;
        const currDir = req.query.currDir;
    
        fsInterface.listDir(path.join(currDir, dirName))
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.send(err);
        });
    });
    
    //directory metadata route
    app.get('/getStats', (req,res) => {
        const dirName = req.query.dirName;
        const currDir = req.query.currDir;
    
        fsInterface.getFileStatsAsync(path.join(currDir, dirName))
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.send(err);
        });
    });

    //nested directory content route
    app.get('/readDirNested', (req,res) => {
    
        //TODO: Chunk data for pages / infinite scrolling
    
        const dirName = req.query.dirName;
    
        fsInterface.listNestedDir(dirName)
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.send(err);
        });
    });
    
    app.get('/nestedFind', function (req, res) {
        const searchString = req.query.queryString;
        const searchDir = req.query.dirName;
    
        fsInterface.findInNestedDir(searchString, searchDir)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
    
    
    });
    
    app.post('/startIndex',jsonParser, (req, res) => {
        // const dir = req.body.directory;
    
        return res.send(req.body);
    
        // recursive(dir, function (err, files) {
        //     // `files` is an array of absolute file paths 
        //     // console.log(files);
        //     files.map((file) => {
        //         elasticInterface.addDocumentsToIndex({ file }, 'filesystem', 'indexedFiles');
        //     });
        //     res.send(`${files.length} files added to index`);
        // });
    
    
    });


};

module.exports = routes;