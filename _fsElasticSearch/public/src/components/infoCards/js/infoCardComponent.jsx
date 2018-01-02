import React, {Component} from 'react';

class InfoCards extends Component {
    render(){
        return {
            <div className="info-card">
                {this.props.card-data.name}
            </div>
        }    
    }
}