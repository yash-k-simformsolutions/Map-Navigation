import React from 'react';
import './RouteInfo.css';
import numeral from 'numeral';

export default function RouteInfo({ distance, time }) {
    var totalTime;
    var timeinHours = Math.floor(time/3600) 
    var timeinMinutes = Math.floor((time%3600)/60)
    if(time < 3600){
        totalTime = `${Math.floor(time/60)} minutes`;
    }
    else{
        totalTime = `${timeinHours} hours ${timeinMinutes} minutes`
    }

    var mtoKm = Math.fround(distance/1000)
    var totalDistance = numeral(mtoKm).format('0,0.00')
    if(distance < 1000){
        totalDistance = `${distance} meters`
    }
    else{
        totalDistance = `${totalDistance} kms`
    }

    return (
        <div className="routeInfo">
            <h2>Route Info</h2>
            <p> <span>Estimated Distance: </span>{totalDistance}</p>
            <p> <span>Estimated Time: </span>{totalTime}</p>
        </div>
    )
}
