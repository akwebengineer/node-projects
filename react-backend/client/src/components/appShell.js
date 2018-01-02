
import React, { Component } from 'react';

class AppShell extends Component {
    render() {
        return (
            <div className="app-shell" >
                <div className="main-area">
                    <div className="bread-crumb-content">
                        {this.props.shellcontents.bcContent}                        
                    </div>
                    <div className="main-content">
                        <div className="main-content-left">
                            {this.props.shellcontents.leftContent}                    
                        </div>
                        <div className="main-content-right">
                            {this.props.shellcontents.mainContent}
                        </div>
                                              
                    </div>
                    <div className="additional-content">
                        {this.props.shellcontents.additionalContent}
                    </div>
                </div>
                <div className="extra-tab"></div>
            </div >
        )
    }
}

export default AppShell;
