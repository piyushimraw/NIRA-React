import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '90%',
  height: '90%'
}
class MarkerMap extends Component{

  constructor(){
    super();

  }

  render(){
    const jsxMarkers = this.props.markers;
    return(
      <Map google={this.props.google}
            style={style}
            title={'A sample of water for pollution'}
            initialCenter={{
            lat: 31.104818,
            lng: 77.173401}}
            zoom={7}>
        {jsxMarkers}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'
})(MarkerMap)
