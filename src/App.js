import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import axios from 'axios';

class App extends Component {
  state = {
    result: null,
  } 

  componentDidMount(){
    this.getResult();
  }

  getResult = async () => {
    const url = "https://api.tomtom.com/routing/1/calculateRoute/22.3039,70.8022:26.9612,70.7939/json?avoid=unpavedRoads&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5";
    try{
      const response = await axios.get(url);
      const responseData = await response.data;
      this.setState({
        result: responseData,
      })
      console.info(this.state.result)
    } catch(error){
      console.error(error);
    }
  }

  render(){
    return (
      <div className="app">
        <Navigation searchResult={this.state.result} />
      </div>
    );
  }
}

export default App;