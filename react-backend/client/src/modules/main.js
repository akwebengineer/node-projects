import React, { Component } from 'react';
// import FSHelper from '../modules/fileSystemHelper';
import AppShell from '../components/appShell';
import InfoCards from '../components/infoCards/js/infoCardComponent';
import BreadCrumb from '../components/breadCrumbs/js/breadCrumbs';
import LeftNav from '../modules/leftNav/leftNavHelper';
import Additional from '../modules/additionalShellContents/additional';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            dirContents: [],
            currDir: '/',
            breadCrumbs: [{ value: '/' }],
            additionalContent: {}
        }
    }

    // fsHelper = new FSHelper();

    componentDidMount() {
        const _startingDir = 'home';
        this.getDirContents(this.state.currDir, _startingDir);
        this.getAdditionalContents();
    }

    render() {
        this._bcItemClick = (index) => {
            const _bcItem = this.state.breadCrumbs[index];
            let _breadCrumbs = this.state.breadCrumbs.slice(0, index);
            this.setState({
                breadCrumbs: _breadCrumbs,
                currDir: _bcItem.currDir
            });
            this.getDirContents(_bcItem.currDir, _bcItem.value);
        };

        this._infoCardClick = (evt, item) => {
            if (item.type === 'directory') {

                // ADD CSS ANIMATION
                // const _card = evt.currentTarget;            
                // // _card.className += ' shrink';
                // _card.style.position = 'fixed';
                // _card.style.top = '0px';
                // _card.style.left = this.bc.width + 'px';        
                // _card.style.width = '0px';        
                // _card.style.height = '0px'; 

                // setTimeout(() => {
                //     this.getDirContents(this.state.currDir, item.name);                
                // }, 500);

                this.getDirContents(this.state.currDir, item.name);


            }
        };

        let _shellContents = {
            leftContent: <LeftNav />,
            bcContent: <BreadCrumb crumbs={this.state.breadCrumbs} itemclick={this._bcItemClick} ref={(bc) => { this.bc = bc; }} />,
            mainContent: this.getMainContents(),
            additionalContent: <Additional additional={this.state.additionalContent} />
        };

        return (
            <div>
                <AppShell shellcontents={_shellContents} />
            </div>
        );

    }

    getDirContents(path = '', dir) {
        //TODO: Factor this out to modules/fileSystemHelper.js

        // this.fsHelper.getDirContents(dir, this.state.currDir,_successCB, _failureCB);

        // const _successCB = (data) => {
        //     this.setState({ dirContents: data.files });
        //     this.setState({ currDir: data.currDir });
        // };

        // const _failureCB = (err) => {
        //     this.setState({ dirContents: [] });
        //     this.setState({ error: err });
        // };        



        const DIR_URI = `/readDir?dirName=${(dir) ? dir : ''}&currDir=${path}`;
        // const DIR_META_URI = `/getStats?dirName=${dir}&currDir=${this.state.currDir}`;

        fetch(DIR_URI, {
            method: 'get'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {


                const _slashIndex = data.currDir.lastIndexOf('/');
                const _dirName = (_slashIndex >= 0) ? data.currDir.substring(_slashIndex + 1) : data.dir;
                let _breadCrumbs = this.state.breadCrumbs.slice();
                _breadCrumbs.push({
                    value: _dirName,
                    currDir: this.state.currDir
                });
                this.setState({
                    dirContents: data.files,
                    currDir: data.currDir,
                    breadCrumbs: _breadCrumbs
                });

                // _fetchMeta();
            })
            .catch((err) => {
                this.setState({ dirContents: [] });
                this.setState({ error: err });
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

    getMainContents() {
        let _sortRow = '';
        let _sortables = ['Name', 'Type', 'Create Date', 'Modified Date', 'Size'];
        let _infoContent = this.state.dirContents.map(
            (item, index) => {
                if (item.type === 'directory') {
                    item.icon = <i className="fa fa-folder-o" aria-hidden="true"></i>
                }
                else if (item.type === 'file') {
                    item.icon = <i className="fa fa-file-o" aria-hidden="true"></i>
                }
                else {
                    item.icon = <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                }
                return <InfoCards
                    key={index + item.name}
                    cardvalue={item}
                    cardclick={this._infoCardClick}
                />
            });

        if (this.state.dirContents.length) {

            let _sortContent = _sortables.map((sortable, index) => {
                return <span className="sortable" key={index}>{sortable}</span>
            });
            _sortRow = <div className="sort-row">
                <span className="sort-title">Sort By: </span>            
                {_sortContent}
            </div>;            
        }

        return (<div>
            {_sortRow}
            <div>
                {_infoContent}
            </div>
        </div>);

    }

    getAdditionalContents() {
        // FETCH FROM BACKEND WHEN READY TO IMPLEMENT

        // TEMP IMPLEMENTATION
        const _fav = [
            { name: "sample 1", icon: "sample" },
            { name: "sample 2", icon: "sample" },
            { name: "sample 3", icon: "sample" }
        ];

        const _rec = [
            { name: "sample 1", icon: "sample" },
            { name: "sample 2", icon: "sample" },
            { name: "sample 3", icon: "sample" }
        ];

        this.setState({
            additionalContent: {
                favorites: _fav,
                recents: _rec
            }
        });
    }

}

export default Main;