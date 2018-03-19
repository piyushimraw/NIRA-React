import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const style = {
  width: '95%',
  height: '85%'
}
export class MapContainer extends Component {

onMarkerClick(props,marker,e){
  console.log('Marker clicked!');
}

render() {
    return (
      <Map google={this.props.google}
            style={style}
            title={'A sample of water for pollution'}
            initialCenter={{
            lat: 23.854885,
            lng: 85.081807
          }}
            zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>A PLACE</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'
})(MapContainer)
