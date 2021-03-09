import React from 'react';
import './Navigation.css';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';

function Navigation({ displayRoute, source, ...props }) {
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
                {/* <Marker position={destination} /> */}
                {props.LocationMap}
                <Polyline 
                    positions={displayRoute} 
                    color="red"
                />
            </MapContainer>
        </div>
    )
}

export default Navigation