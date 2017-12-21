
import React, { Component } from 'react';
import InfoCards from './infoCards/js/infoCardComponent';

class AppShell extends Component {
    constructor() {
        super();
        this.state = {
            dirContents: []
        }
    }

    componentWillMount() {
        const _fetchRoot = () => {
            fetch('/readDir?dirName=/home', {
                method: 'get'
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({ dirContents: data });
                })
                .catch((err) => {
                    this.setState({ dirContents: [] });
                    this.setState({ error: err });
                });
        }

        _fetchRoot();
    }


    render() {
        // const _directoryContent = this.state.dirContents.map((item) => {
        //     return <InfoCards carddata={item} />
        // });
        let  _directoryContent = this.state.dirContents.map(function(item, index){return <InfoCards key={index+item} carddata={item} />});
        
        // console.log(this.state.dirContents);

        // const _directoryContent = "Test";
        return (
            <div className="app-shell" >
                <div className="main-area">
                    <div className="main-content">
                        {_directoryContent}
                    </div>
                    <div className="additional-content"></div>
                </div>
                <div className="extra-tab"></div>
            </div >
        )
    }
}

export default AppShell;
