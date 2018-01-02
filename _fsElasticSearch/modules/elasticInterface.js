const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200/']
});


const testElasticsearchConnection = () =>{
    client.ping({
        requestTimeout: 30000,
    }, function(error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('Everything is ok');
        }
    });
}

const createElasticsearchIndex = () => {

    client.indices.create({
        index: 'filesystem'
    }, function(err, resp, status) {
        if (err) {
            console.log(err);
        } else {
            console.log("create", resp);
        }
    });


}

// createElasticsearchIndex();


const addDocumentsToIndex = (document, index, type) => {
    client.index({
        index: index,        
        type: type,
        body: document
    }, function(err, resp, status) {
        console.log(resp);
    });

}

const searchFiles = (searchString, dir) =>{
    console.log(searchString);
    const searchPromise = new Promise((resolve, reject) => {
        client.search({
            index: 'filesystem',
            type: 'indexedFiles',
            body:{
                query:{
                    match: {
                        'file': searchString
                    }
                }
            }
        }).then(function(resp) {
            resolve(resp);
        }, function(err) {
            reject(err);
        });
    });


    return searchPromise;
}


module.exports = {
    testElasticsearchConnection,
    createElasticsearchIndex,
    addDocumentsToIndex,
    searchFiles
};