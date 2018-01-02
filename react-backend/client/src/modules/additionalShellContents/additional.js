import React, {Component} from 'react';
import ('./additional.css');

class Additional extends Component {
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount() {
    }

    render() {

        let _favs = '';
        let _recents = '';
        
        _favs = (this.props.additional.favorites && this.props.additional.favorites.length) && this.props.additional.favorites.map((favItem, index) => {
            return (
                <div className="element" key={index}>
                    {favItem.name}
                </div>
            );
        });

         _recents = (this.props.additional.recents && this.props.additional.recents.length) && this.props.additional.recents.map((recItem, index) => {
            return (
                <div className="element" key={index}>
                    {recItem.name}
                </div>
            );
        });



        return (
            <div className="additional-shell-container">
                <div className="favorites-container">
                    <div className="favorites-title">
                        Favorites
                    </div>
                    <div className="favorites-content">
                        {_favs}                    
                    </div>
                </div>
                <div className="recents-container">
                    <div className="recents-title">
                        Recents
                    </div>
                    <div className="recents-content">
                        {_recents}
                    </div>
                </div>
            </div>
        );
    }
}

export default Additional;