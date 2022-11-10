import React from "react";
import maps from '../assets/maps.svg';

class Waiting extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='wait-result'>
                <h1>Veuillez selectionner une ville.</h1>
                <img src={maps} alt="carte"/>
            </div>
        )
    }
}

export default Waiting;