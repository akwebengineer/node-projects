import React, { Component } from 'react';
import '../css/breadCrumbs.css';

class BreadCrumb extends Component {
    render() {

        const _crumbLength = this.props.crumbs.length;

        const _breadCrumbClick = (index, evt) => {
            // alert(this);
            this.props.itemclick(index);
        };

        let _curmbElements = this.props.crumbs.map((crumb, index) => {
            return (<div className="bread-crumb-item-container" key={index + crumb}>
                <div className={`bcChevron chevron-${index}`}>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
                <div className="bread-crumb-item"                    
                    onClick={_breadCrumbClick.bind(this, index)}>
                    {crumb.value}
                </div>
            </div>);
        });

        return (<div className="bread-crumb">
            <span className="bread-crumb-inner" ref={(bcinner) => {this.breadCrumbInner = bcinner; }}>
            {_curmbElements}
            </span>
        </div>);
    }

    componentDidMount(){
        // this.width = this.breadCrumbInner.offsetWidth;
        // this.left  = this.breadCrumbInner.offsetLeft;
        // this.top  = this.breadCrumbInner.offsetTop;
    }
}

export default BreadCrumb;