import React, { Component } from 'react';
import './Navigation.css';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';

export default class Navigation extends Component {
    state = {
        resultData: null,
    }

    storeinState = () => {
        this.setState({
            resultData: this.props.searchResult,
        })
        console.long(this.state.resultData)
    }

    render() {
        const startPosition = [22.3039,70.8022]; 
        const endPosition = [22.292199,70.781534]
        
        return (
            <div className="navigation">
                <div id="map">
                    <MapContainer center={startPosition} zoom={14} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Polyline positions={[ 
                            [22.3039,70.8022],
                            [22.292199,70.781534]
                        ]} 
                        color={'red'}
                        />
                        <Marker position={startPosition} />
                        <Marker position={endPosition} />
                    </MapContainer>
                </div>
            </div>
        )
    }
}
