const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

const elasticInterface = require('../modules/elasticInterface.js');
const _appConstantsModule = require('./constants');
const _appConstants = _appConstantsModule.getAppConstants();

const listDir = (dir) => {
    const dirReadPromise = new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(`${_appConstants.dirReadError} >> ${err}`);
            }
            else {
                //TODO: Need to resolve issues with reading stats for certain types
                // const filesWithMeta = [];
                // files.map((file) => {
                //     filesWithMeta.push(_getFileStats(file));
                // });
                // resolve(filesWithMeta);
                resolve(files);
            }
        });
    });

    return dirReadPromise;
};

const listNestedDir = (dir) => {
    //TODO: Chunk data for pages / infinite scrolling
    const nestedDirReadPromise = new Promise((resolve, reject) => {
        recursive(dir, function (err, files) {
            // `files` is an array of absolute file paths 
            if (err) {
                reject(err);
            }
            else {
                //TODO: Need to add file meta data by calling _getFileStats
                resolve(files);
            }
        });
    });
    return nestedDirReadPromise;
};

const findInDir = () => { };

const findInNestedDir = (searchString, dir) => {
    const nestedFindPromise = new Promise((resolve, reject) => {
        let files = elasticInterface.searchFiles(searchString, dir);

        files.then((data) => {
            resolve(data);            
        }).catch((err) => {
            reject(err);
        });

    });

    return nestedFindPromise;
};

const createFile = () => { };

const createDir = () => { };

const deleteFile = () => { }

const deleteDir = () => { }

const _getFileStats = (file) => {
    const _meta = fs.statSync(file);
    let _type = null;
    if (_meta.isFile()) {
        _type = "file";
    }
    else if (_meta.isDirectory()) {
        _type = "directory";
    }
    return {
        name: file,
        type: _type,
        meta: _meta
    };

    // return file;    
}

module.exports = {
    listDir,
    listNestedDir,
    findInNestedDir
}

