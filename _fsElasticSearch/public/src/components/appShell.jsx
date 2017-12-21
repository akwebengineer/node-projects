
import React, { Component } from 'react';
import InfoCards from './infoCards/js/infoCardComponent.jsx';

class AppShell extends Component {
    constructor() {
        super();
        this.state = {
            dirContents : []
        }
    }

    componentWillMount() {
        const _fetchRoot = () => {
            fetch('/readDir?dirName=/home',{
                method: 'get'
            })
            .then((response) => {
                this.state.dirContents = response;
            })
            .catch((err) => {
                this.state.dirContents = null;
                this.state.error = err;
            });
        }
    }


    render() {
        const _directoryContent = this.state.dirContents.map((item) => {
            return <InfoCards card-data={item}/>
        });
        return {
            <div className = "app-shell" >
            <div className="main-area">
                <div className="main-content">
                    {_directoryContent}
                </div>
                <div className="additional-content"></div>
            </div>
            <div className="extra-tab"></div>
            </div >
        }
}
}

