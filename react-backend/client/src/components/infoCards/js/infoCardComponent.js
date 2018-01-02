import React, { Component } from 'react';
import('../css/infoCardComponent.css');

class InfoCards extends Component {
    render() {
        const _additionalItems = this.props.cardvalue.meta;
        let _additionalItemElements = Object.keys(_additionalItems).map((_key) => {
            return <div className="info-card-additional-item" key={_key + _additionalItems[_key]}>
                {_additionalItems[_key]}
            </div>
        });




        // for(let _key in _additionalItems) {
        //     console.log(this.props.cardvalue.name);
        //     console.log(_additionalItems[_key]);
        //     _additionalItemElements += <div className="info-card-additional-item" key={_key + _additionalItems[_key]}>
        //         {_additionalItems[_key]}
        //     </div>
        // }

        // let _additionalItemElements = _additionalItems.map((item, index) => {
        //     return (<div className="info-card-additional-item" key={index+item.value}>
        //             </div>);

        // });

        const _cardClick = (item, evt) => {
            this.props.cardclick(evt, item);
        }

        return (
            <div className="info-card" onClick={_cardClick.bind(this, this.props.cardvalue)}>
                <div className="info-card-title">
                    <div className="info-card-title-icon">
                        {this.props.cardvalue.icon}
                    </div>
                    <div className="info-card-title-text">
                        {this.props.cardvalue.name}
                    </div>
                </div>
                <div className="info-card-additional"> {_additionalItemElements} </div>
            </div>
        )
    }
}

export default InfoCards;