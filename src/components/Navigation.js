import React from 'react';
import './Navigation.css';
import { MapContainer, Marker, Polyline, TileLayer, Popup } from 'react-leaflet';

function Navigation({ displayRoute, source, destination, ...props }) {
    console.log(displayRoute())

    return (
        <div className="navigation">
            <MapContainer
                center={source}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={source} />
                {
                    destination && <Marker position={destination} />
                }
                {props.LocationMap}
                {
                    displayRoute() && (<Polyline 
                        positions={displayRoute()} 
                        color="blue"
                    >
                        <Popup>Polyline</Popup>
                    </Polyline>)
                }
                
            </MapContainer>
        </div>
    )
}

export default Navigation