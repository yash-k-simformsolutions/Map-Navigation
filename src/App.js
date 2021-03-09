import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import axios from 'axios';
import Header from './components/Header';
import 'antd/dist/antd.css';
import RouteInfo from './components/RouteInfo';
import { useMapEvents } from 'react-leaflet';

function App() {
  const [sourceStartPosition, setSourceStartPosition] = useState(null);
  const [sourceEndPosition, setSourceEndPosition] = useState(null);
  const [destinationStartPosition, setDestinationStartPosition] = useState(null);
  const [destinationEndPosition, setDestinationEndPosition] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [distance, setDistance] = useState(`0 meters`);
  const [time, setTime] = useState(`0 seconds`);

  const getPositions = (sourceStart, sourceEnd, destinationStart, destinationEnd) => {
    setSourceStartPosition(sourceStart);
    setSourceEndPosition(sourceEnd);
    setDestinationStartPosition(destinationStart);
    setDestinationEndPosition(destinationEnd);
    setSource([sourceStart, sourceEnd]);
    setDestination([destinationStart, destinationEnd])
    getRoutePoints();
  }
  
  console.log(sourceStartPosition, sourceEndPosition, destinationStartPosition, destinationEndPosition);

  const LocateMap = () => {
    const map = useMapEvents({
      locationfound(source){
        map.flyTo(source, map.getZoom())
      }
    })
  }

  const getCoordinates = () => {
    var points = routeData?.routes[0]?.legs[0]?.points.map((coordinate) => {
      return [coordinate.latitude, coordinate.longitude]
    })
    return points;
  }

  const getRoutePoints = async () => {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${sourceStartPosition},${sourceEndPosition}:${destinationStartPosition},${destinationEndPosition}/json?avoid=unpavedRoads&travelMode=car&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5`
    // const url = "https://api.tomtom.com/routing/1/calculateRoute/22.28216,70.75416:22.27645,70.75791/json?avoid=unpavedRoads&travelMode=bicycle&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5"
    try{
      const response = await axios.get(url);
      const responseData = await response.data;
      setRouteData(responseData)
      setDistance(routeData?.routes[0]?.summary?.lengthInMeters)
      setTime(routeData?.routes[0]?.summary?.travelTimeInSeconds)
      console.log(routeData)
    } catch (error){
      console.log(error)
    }
  }

  console.log(routeData)
  const position = [22.28216,70.75416]
  return (
    <div className="app">
      <Header 
        getPositions={getPositions} 
      />

      {
        source === null ? (
          <Navigation
            displayRoute={ getCoordinates }
            source={position}
            LocateMap={<LocateMap />}
          />
        ) : (
          <Navigation
            displayRoute={ getCoordinates }
            source={source}
            destination={destination}
            LocateMap={<LocateMap />}
          />
        )
      }
      
      <RouteInfo 
        distance={distance}
        time={time}
      />
    </div>
  )
}

export default App;