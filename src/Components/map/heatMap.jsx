import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {HeatMap} from 'google-maps-react';

var gradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'

];

var positions = [
  {lat: 31.104818, lng: 77.173401},
  {lat: 31.104918, lng: 77.173501},
  {lat: 31.104968, lng: 77.173551},
  {lat: 31.104998, lng: 77.173691},
  {lat: 31.105018, lng: 77.173731},
  {lat: 31.105118, lng: 77.173401},
  {lat: 31.105218, lng: 77.173401},
  {lat: 31.105318, lng: 77.173401},
  {lat: 31.105418, lng: 77.173401},
  {lat: 31.105418, lng: 77.173401},
  {lat: 31.104518, lng: 77.173401},
  {lat: 31.104818, lng: 77.173401},
  {lat: 31.104818, lng: 77.173401},
  {lat: 31.104818, lng: 77.173401},
  {lat: 31.104818, lng: 77.173401},
  {lat: 31.104818, lng: 77.173401}

];

class WithHeatMap extends Component{

render(){
    console.log('Rendering heatmap');
    let m = new HeatMap();
    console.log(this.props);
    return (

      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          initialCenter={{
          lat: 31.104818,
          lng: 77.173401
        }}
          zoom={14}>

        <HeatMap
          gradient={gradient}
          radius={20}
          opacity={0.3}
          positions={positions}

        />

      </Map>

    )

  }

}

export default WithHeatMap
