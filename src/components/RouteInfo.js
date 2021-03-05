import React, { Component } from 'react';
import './RouteInfo.css';

export default class RouteInfo extends Component {
    render() {
        return (
            <div className="routeInfo">
                <h2>Route Info</h2>
                <p> <span>Estimated Distance: </span>{this.props.routeResult?.routes[0]?.summary?.lengthInMeters} </p>
                <p> <span>Estimated Distance: </span>{this.props.routeResult?.routes[0]?.summary?.travelTimeInSeconds} </p>
            </div>
        )
    }
}
