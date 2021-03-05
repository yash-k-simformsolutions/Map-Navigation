import React, { Component } from 'react';
import './Navigation.css';
export default class Navigation extends Component {

    componentDidMount(){
        this.displayMap();
    }

    displayMap = () => {
        const script = document.createElement('script')
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
        document.body.appendChild(script);
        script.async = true;
        script.onload = () => {
            window.tomtom.L.map('map', {
                source: 'vector',
                key: 'aYHki4CsTAmcezV1KW5fFqdumSH0zkC5',
                center: [22.3, 70.78],
                basePath: '/sdk',
                zoom: 15
            });
        }
    }

    render() {
        return (
            <div className="navigation">
                <div id="map"></div>
            </div>
        )
    }
}
