import React, { Component } from 'react';
import './Navigation.css';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
// import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';

export default class Navigation extends Component {
    state = {
        routePoints: null,
        routeDetails: null,
        sourceStartPosition: 20.5937,
        sourceEndPosition: 78.9629,
        destinationStartPosition: null,
        destinationEndPosition: null,
    }

    componentDidMount(){
        this.displayMap();
    }

    displayMap = () => {
        var position = [this.state.sourceEndPosition, this.state.sourceStartPosition]
        // var startPosition = [this.state.sourceEndPosition, this.state.sourceStartPosition ]
        // var endPosition = [this.state.destinationEndPosition, this.state.destinationStartPosition ];

        // const ttDrawingTools = new tt.plugins.DrawingTools({
        //     ttMapsSdk: tt,
        //     controls: {
        //         line: false,
        //     }
        // });

        const map = tt.map({
            key: 'aYHki4CsTAmcezV1KW5fFqdumSH0zkC5',
            container: 'map',
            center: position,
            zoom: 5
        });
        var sourceMarker = new tt.Marker().setLngLat(position).addTo(map);
        sourceMarker.setDraggable(true);

        map.on('load', () => {
            map.addLayer({
                'id': 'overlay',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry' : {
                            'type': 'Polylgon',
                            'coordinates': [[
                                [
                                    22.28214,
                                    70.75408
                                ],
                                [
                                    22.28228,
                                    70.75403
                                ],
                                [
                                    22.28233,
                                    70.75423
                                ],
                                [
                                    22.28239,
                                    70.75443
                                ],
                                [
                                    22.28268,
                                    70.75543
                                ],
                                [
                                    22.28286,
                                    70.75606
                                ],
                                [
                                    22.28296,
                                    70.75641
                                ],
                                [
                                    22.28311,
                                    70.75690
                                ],
                                [
                                    22.28351,
                                    70.75670
                                ],
                                [
                                    22.28377,
                                    70.75657
                                ],
                                [
                                    22.28379,
                                    70.75662
                                ],
                                [
                                    22.28353,
                                    70.75674
                                ],
                                [
                                    22.28312,
                                    70.75694
                                ],
                                [
                                    22.28261,
                                    70.75719
                                ],
                                [
                                    22.28252,
                                    70.75724
                                ],
                                [
                                    22.28195,
                                    70.75753
                                ],
                                [
                                    22.28144,
                                    70.75778
                                ],
                                [
                                    22.28097,
                                    70.75801
                                ],
                                [
                                    22.28078,
                                    70.75813
                                ],
                                [
                                    22.28067,
                                    70.75820
                                ],
                                [
                                    22.28043,
                                    70.75823
                                ],
                                [
                                    22.28027,
                                    70.75828
                                ],
                                [
                                    22.28013,
                                    70.75832
                                ],
                                [
                                    22.28001,
                                    70.75838
                                ],
                                [
                                    22.27991,
                                    70.75841
                                ],
                                [
                                    22.27991,
                                    70.75833
                                ],
                                [
                                    22.27972,
                                    70.75838
                                ],
                                [
                                    22.27946,
                                    70.75842
                                ],
                                [
                                    22.27915,
                                    70.75855
                                ],
                                [
                                    22.27909,
                                    70.75856
                                ],
                                [
                                    22.27864,
                                    70.75877
                                ],
                                [
                                    22.27858,
                                    70.75861
                                ],
                                [
                                    22.27847,
                                    70.75839
                                ],
                                [
                                    22.27841,
                                    70.75821
                                ],
                                [
                                    22.27841,
                                    70.75819
                                ],
                                [
                                    22.27837,
                                    70.75801
                                ],
                                [
                                    22.27837,
                                    70.75788
                                ],
                                [
                                    22.27833,
                                    70.75781
                                ],
                                [
                                    22.27833,
                                    70.75772
                                ],
                                [
                                    22.27827,
                                    70.75760
                                ],
                                [
                                    22.27821,
                                    70.75750
                                ],
                                [
                                    22.27802,
                                    70.75741
                                ],
                                [
                                    22.27773,
                                    70.75745
                                ],
                                [
                                    22.27740,
                                    70.75754
                                ],
                                [
                                    22.27712,
                                    70.75765
                                ],
                                [
                                    22.27684,
                                    70.75774
                                ],
                                [
                                    22.27667,
                                    70.75783
                                ],
                                [
                                    22.27658,
                                    70.75790
                                ]
                            ]]
                        }
                    }
                },
                'layout': {},
                'paint': {
                    'fill-color': 'red',
                    'fill-opacity': 0.5,
                    'fill-outline-color': 'black'
                }
            })
        })

        // map.addControl(ttDrawingTools, 'top-left')
    }

    routeInfo = () => {
        var points = []
        this.state.routeDetails?.routes[0]?.legs[0]?.points?.map((point) => (
            points.push([point.latitude,point.longitude])
        ))
        this.setState({
            routePoints: points,
            routeDetails: this.props.displayRoute,
            sourceStartPosition: this.props.markerSourceStartPosition,
            sourceEndPosition: this.props.markerSourceEndPosition,
            destinationStartPosition: this.props.markerDestinationStartPosition,
            destinationEndPosition: this.props.markerDestinationEndPosition,
        }, () => {
            console.log(this.state.routePoints)
            console.log(this.state.routeDetails)
            console.log(this.state.sourceStartPosition)
            console.log(this.state.sourceEndPosition)
            console.log(this.state.destinationStartPosition)
            console.log(this.state.destinationEndPosition)
        })
    }

    render() {
        return (
            <div className="navigation">
                <div id="map"></div>
            </div>
        )
    }
}
