import React from "react";
import {Marker, Popup} from "react-leaflet";
import Card from "./Card";

import marker from '../assets/marker-icon.png';
import { Icon } from 'leaflet'
const myIcon = new Icon({
 iconUrl: marker,
 iconSize: [32,32]
})

class Pin extends React.Component {
    constructor(props){
        super(props);
        this.information = this.props.information;
    }

    render() {
        return (
           <>
            <Marker position={[this.information.position.latitude, this.information.position.longitude]} icon={myIcon}>
                <Popup>
                    <Card 
                        information={this.information}
                    />
                </Popup>
            </Marker> 
           </>
        )
    }
}

export default Pin;