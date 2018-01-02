import React, { Component } from 'react';
import('./leftNavHelper.css');

class LeftNav extends Component {
    constructor() {
        super();
        this.state = {
            leftNavContents: [
                {
                    action: 'createFile',
                    title: 'New File',
                    className: 'fa fa-plus-square-o'
                },
                {
                    action: 'createDir',
                    title: 'New Folder',
                    className: 'fa fa-plus-square-o'
                },
                {
                    action: 'rename',
                    title: 'Rename Current Folder',
                    className: 'fa fa-pencil-square-o'
                },
                {
                    action: 'remove',
                    title: 'Delete Current Folder',
                    className: 'fa fa-minus-square-o'
                },
                {
                    action: 'move',
                    title: 'Move Current Folder',
                    className: 'fa fa-long-arrow-right'
                }
            ]
            // 'createFile', 'createDir', 'rename', 'move']
        }
    }

    addNavElements() {
        let _leftElems = this.state.leftNavContents.map((elem, idx) => {
            return (<div key={idx} className="nav-action-item">
                <span className="nav-action-icons">
                    <i className={`nav-action-elem ${elem.className}`} aria-hidden="true"></i>
                </span>
                <span className="nav-action-title nav-action-elem" data-action={elem.action}>
                    {elem.title}
                </span>
            </div>);
        });
        return _leftElems;
    }


    render() {
        return (
            <div className="left-nav-container">
                <div className="search-folder">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input type="text" className="search-folder-input" placeholder="Find in folder"></input>
                    <span className="search-folder-advanced">Advanced</span>
                    <i className="fa fa-chevron-down advanced-chevron" aria-hidden="true"></i>
                </div>
                <div className="advanced-search">
                    <ul>
                        <li className="search-selection">
                            <span>
                                <i className="fa fa-check-square-o" aria-hidden="true"></i>
                            </span>
                            <span style={{"margin-left": "10px"}}>
                                Find file names in current directory
                            </span>
                        </li>
                        <li className="search-selection">
                            <span>
                                <i className="fa fa-square-o" aria-hidden="true"></i>
                            </span>
                            <span style={{"margin-left": "10px"}}>
                                Find file names in nested directories
                            </span>
                        </li>
                        <li className="search-selection">
                            <span>
                                <i className="fa fa-square-o" aria-hidden="true"></i>
                            </span>
                            <span style={{"margin-left": "10px"}}>
                                Find file contents in current directory
                            </span>
                        </li>

                    </ul>
                </div>
                <div>
                    {this.addNavElements()}
                </div>
            </div>
        );
    }
}

export default LeftNav;