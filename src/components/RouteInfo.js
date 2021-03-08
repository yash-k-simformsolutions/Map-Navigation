import React, { Component } from 'react';
import './RouteInfo.css';

export default class RouteInfo extends Component {
    state = {
        distance: 0,
        time: 0,
    }

    componentDidMount(){
        this.getrouteInfo()
    }

    getrouteInfo = () => {
        this.setState({
            distance: this.props.routeInfo?.routes[0]?.summary?.lengthInMeters,
            time: this.props.routeInfo?.routes[0]?.summary?.travelTimeInSeconds,
        },() => {
            console.log(this.state.distance)
            console.log(this.state.time)
        })
    }

    render() {
        return (
            <div className="routeInfo">
                <h2>Route Info</h2>
                <p> <span>Estimated Distance: </span>{this.state.distance} </p>
                <p> <span>Estimated Distance: </span>{this.state.time} </p>
            </div>
        )
    }
}
