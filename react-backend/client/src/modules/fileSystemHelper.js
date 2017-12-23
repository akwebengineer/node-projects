// NOT BEING USED. NEEDS DEEPER ANALYSIS IN USING WITHIN MAIN.JS

class FSHelper {
    constructor(){}

    getDirContents(dir, currDir,  successCB, failureCB) {
        const DIR_URI = `/readDir?dirName=${dir}&currDir=${currDir}`;
        // const DIR_META_URI = `/getStats?dirName=${dir}&currDir=${this.state.currDir}`;
        // let _dirContents = this.state.dirContents.slice();        
        fetch(DIR_URI, {
            method: 'get'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                successCB(data);
                // this.setState({ dirContents: data.files });
                // this.setState({ currDir: data.currDir });
                // _fetchMeta();
            })
            .catch((err) => {
                // failureCB(err);
                // this.setState({ dirContents: [] });
                // this.setState({ error: err });
            });

        // const _fetchMeta = () => {
        //     fetch(DIR_META_URI, {
        //         method: 'get'
        //     }).then((response) => {
        //         return response.json();
        //     }).then((data) => {
        //         this.setState({ dirContents: data});
        //     }).catch((err) => {
        //         this.setState({ error: err});
        //     });
        // };
    }
}


export default FSHelper;