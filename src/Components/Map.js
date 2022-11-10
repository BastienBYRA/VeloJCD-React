import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import '../App.css'
import '../index.css';
import Pin from "./Pin";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.longitude = this.props.position[0]
        this.latitude = this.props.position[1]
        this.pins = this.props.pins
    }

    render() {
        return (
            <div className="map-container-component">
                <MapContainer
                center={[this.longitude, this.latitude]}
                zoom={14}
                scrollWheelZoom={false}
                style={{height: "75vh", width: "90vw"}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.pins.map((pin, i) => (
                    <Pin 
                        key={i}
                        information={pin}
                    />
                ))}
                </MapContainer>
            </div>
        )
    }
}

// import React from "react";
// import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// import '../App.css'
// import '../index.css';
// import 'leaflet/dist/leaflet.css';

// const Map = () => {

//     return (

//         <>
            
//         </>
//     )
// };

export default Map;