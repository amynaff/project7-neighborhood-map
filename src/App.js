import React, { Component } from 'react';

import './App.css';
import Map from './components/Map.js';
import SquareAPI from "./API"

class App extends Component {
  constructor() {
    super()
    this.state ={
      venues: [],
      markers: [],
      center: [],
      zoom: 13
    };
  }

  componentDidMount(){
    SquareAPI.search({
      query: "winery",
      intent:"browse",
      radius:"50000",
      near: "Cambria", 
      limit: 10 
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => { 
        return {
          lat: venue.location.lat,
          lng: venue.location.lng, 
          isOpen: false,
          inVisible: true
        };
      });
      this.setState({ venues, center, markers });
      console.log(results);
  });
}
  render() {
    return (
      <div className="App">
       <Map />
      </div>
    );
  }
}

export default App;
