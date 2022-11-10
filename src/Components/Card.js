import React from "react";

class Card extends React.Component {
    constructor(props){
        super(props);
        this.information = this.props.information;
    }

    render() {
        return (
            <div className="card-info">
                    <h2>{this.information.name}</h2>
                    <p>Adresse : {this.information.address}</p>
                    <p>Nombre de vélos et places totale : {this.information.totalStands.capacity}</p>
                    <p>Sont disponible</p>
                    <ul>
                        <li>Vélo disponible : {this.information.totalStands.availabilities.bikes}</li>
                        <ul>
                            <li>Mécanique : {this.information.totalStands.availabilities.mechanicalBikes}</li>
                            <li>Electrique : {this.information.totalStands.availabilities.electricalBikes}</li>
                        </ul>
                        <li>Place disponible : {this.information.totalStands.availabilities.stands}</li>
                    </ul>
                    <p>Status : {this.information.status}</p>
            </div>
        )
    }
}

export default Card;