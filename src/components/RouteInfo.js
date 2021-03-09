import React from 'react';
import './RouteInfo.css';

export default function RouteInfo({ distance, time }) {
    return (
        <div className="routeInfo">
            <h2>Route Info</h2>
            <p> <span>Estimated Distance: </span>{distance} </p>
            <p> <span>Estimated Time: </span>{time} </p>
        </div>
    )
}
