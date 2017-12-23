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
                </div>
                <div>
                    {this.addNavElements()}                    
                </div>
            </div>
        );
    }
}

export default LeftNav;