import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import axios from 'axios';
import Header from './components/Header';
import 'antd/dist/antd.css';
import RouteInfo from './components/RouteInfo';

class App extends Component {
  state = {
    sourceStartPosition: null,
    sourceEndPosition: null,
    destinationStartPosition: null,
    destinationEndPosition: null,
    routeData: null,
  }

  // componentDidMount(){
  //   this.getRoutePoints();
  // }

  getPositions = (sourceStart, sourceEnd, destinationStart, destinationEnd) => {
    this.setState({
      sourceStartPosition: sourceStart,
      sourceEndPosition: sourceEnd,
      destinationStartPosition: destinationStart,
      destinationEndPosition: destinationEnd,
    }, () => {
      this.getRoutePoints()
    })
  }

  getRoutePoints = async () => {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${this.state.sourceStartPosition},${this.state.sourceEndPosition}:${this.state.destinationStartPosition},${this.state.destinationEndPosition}/json?avoid=unpavedRoads&travelMode=bicycle&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5`
    // const url = "https://api.tomtom.com/routing/1/calculateRoute/22.28216,70.75416:22.27645,70.75791/json?avoid=unpavedRoads&travelMode=bicycle&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5"
    try{
      const response = await axios.get(url);
      const responseData = await response.data;
      this.setState({
        routeData: responseData,
      })
      console.log(this.state.routeData)
    } catch (error){
      console.log(error)
    }
  }

  render(){
    console.log(this.state.routeData)
    return (
      <div className="app">
        <Header 
          getPositions={this.getPositions} 
        />

        <Navigation 
          displayRoute={ this.state.routeData } 
          markerSourceStartPosition={ this.state.sourceStartPosition } 
          markerSourceEndPosition={ this.state.sourceEndPosition }  
          markerDestinationStartPosition={ this.state.destinationStartPosition }
          markerDestinationEndPosition={ this.state.destinationEndPosition }
        />
        
        <RouteInfo 
          routeInfo={ this.state.routeData }
        />
      </div>
    );
  }
}

export default App;