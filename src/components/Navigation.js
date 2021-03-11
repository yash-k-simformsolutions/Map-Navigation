import React, { useEffect } from 'react';
import './Navigation.css';
import { MapContainer, Marker, Polyline, TileLayer, Popup, Tooltip } from 'react-leaflet';
import ChangePosition from './ChangePosition';

function Navigation({ displayRoute, source, destination }) {
    console.log(displayRoute())

    // useEffect(() => [
    //     <ChangePosition center={source} />
    // ])

    return (
        <div className="navigation">
            <MapContainer
                center={source}
                zoom={8}
                >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={source} >
                    <Tooltip direction="top" offset={[-15, -8]} permanent >Source</Tooltip>
                </Marker>
                {
                    destination && (<Marker position={destination} >
                        <Tooltip direction="top" offset={[-15, -8]} permanent >Destination</Tooltip>
                    </Marker>)
                }
                
                <ChangePosition center={source} />
                
                {/* {props.LocationMap} */}
                {/* {
                    displayRoute() && (<ChangePosition center={source} />)
                } */}

                {
                    displayRoute() && (<Polyline 
                        positions={displayRoute()} 
                        color="blue"
                    >
                        <Popup>Polyline</Popup>
                    </Polyline>
                    )
                }
                
            </MapContainer>
        </div>
    )
}

export default Navigation