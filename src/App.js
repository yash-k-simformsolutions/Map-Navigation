import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
// import axios from 'axios';
import Header from './components/Header';
import 'antd/dist/antd.css';
import RouteInfo from './components/RouteInfo';

class App extends Component {
  state = {
    sourceStartPosition: null,
    sourceEndPosition: null,
    destinationStartPosition: null,
    destinationEndPosition: null,
  }

  getPositions = (sourceStart, sourceEnd, destinationStart, destinationEnd) => {
    this.setState({
      sourceStartPosition: sourceStart,
      sourceEndPosition: sourceEnd,
      destinationStartPosition: destinationStart,
      destinationEndPosition: destinationEnd,
    })
    console.log(this.state.sourceStartPosition)
    console.log(this.state.sourceEndPosition)
    console.log(this.state.destinationStartPosition)
    console.log(this.state.destinationEndPosition)
  }

  render(){
    return (
      <div className="app">
        <Header getPositions={this.getPositions} />
        <Navigation />
        <RouteInfo />
      </div>
    );
  }
}

export default App;