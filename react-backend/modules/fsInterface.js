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

                const filesArr = [];
                files.map((file) => {
                    const _meta = _getFileStats(path.join(dir,file));
                    filesArr.push({
                        name: file,
                        currDir: dir,
                        type: _meta.type,
                        meta: _meta.meta
                    });
                });

                resolve({ files: filesArr, currDir: dir });
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
    const _crDt = new Date(_meta.birthtimeMs);
    const _modDt = new Date(_meta.mtimeMs);        
    let _type = null;
    if (_meta.isFile()) {
        _type = "file";
    }
    else if (_meta.isDirectory()) {
        _type = "directory";
    }
    return {        
        type: _type,
        meta: {
            createDate: `Was created on ${_crDt.getMonth()}/${_crDt.getDate()}/${_crDt.getFullYear()} ${_crDt.getHours()}:${_crDt.getMinutes()}:${_crDt.getSeconds()}`,
            modifiedDate: `Was modified on ${_modDt.getMonth()}/${_modDt.getDate()}/${_modDt.getFullYear()} ${_modDt.getHours()}:${_modDt.getMinutes()}:${_modDt.getSeconds()}`,
            size: `The size is ${_meta.size} bytes`
        }
    };

    // return file;    
}

const getFileStatsAsync = (dir) => {
    // const slashIndex = file.lastIndexOf('/');
    // const fileName = file.substr((slashIndex >= 0) ? slashIndex+1 : 0);

    listDir().then((data) => {

    }).catch();
    const fileStatPromise = new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                const _meta = stats;
                let _type = null;
                if (_meta.isFile()) {
                    _type = "file";
                }
                else if (_meta.isDirectory()) {
                    _type = "directory";
                }
                resolve(
                    {
                        name: file,
                        currDir: dir,
                        type: _type,
                        meta: _meta
                    }
                );
            }
        });

    });
    return fileStatPromise;
}

module.exports = {
    listDir,
    listNestedDir,
    findInNestedDir,
    getFileStatsAsync
}

