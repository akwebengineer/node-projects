import React, {Component} from 'react';
import ('../css/infoCardComponent.css');

class InfoCards extends Component {
    render(){
        return (
            <div className="info-card">
                {this.props.carddata}
            </div>
        )  
    }
}

export default InfoCards;