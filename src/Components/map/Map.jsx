import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as MapActions from '../../actions/mapActions';
import SampleStore from '../../stores/SamplesStore';

const style = {
  width: '95%',
  height: '85%'
}
const INITIAL_LAT = 23.854885;
const INITIAL_LNG = 85.081807;

export class MapContainer extends Component {

  constructor(){
    super();
    this.state = {
        markerData : [],
        initial_load : true
    }
  }

  componentWillMount(){
    SampleStore.on('change',() =>{
      this.setState({
          initial_load : false,
          markerData : SampleStore.populateMarkerCoordinatesAndId()


      })
    })
  }

  onMarkerClick(props,marker,e){
        //props.id
     MapActions.useMapData(props.id);
}

  // renderMarkers(){
  //   if(this.state.markerData.length !== 0 )
  //     {
  //       for(var i=0;i<this.state.markerData.length;i++)
  //       {
  //         console.log(this.state.markerData[i].coordinates.lat);
  //             markers.push(<Marker onClick={this.onMarkerClick}
  //                           position={{lat : this.state.markerData[i].coordinates.lat,lng : this.state.markerData[i].coordinates.lng}}
  //                           id = {this.state.markerData[i].id}
  //                           name={'Sample'} />
  //                         );
  //
  //       }
  //                 return markers;
  //
  //     }
  // }

render() {
  const markers = this.state.markerData.map(marker => {
    return <Marker onClick={this.onMarkerClick}
             position={{lat : marker.coordinates.lat,lng : marker.coordinates.long}}
             id = {marker.id}
             name={'Sample'} />
  });

      if(!this.state.initial_load)
    return (
      <Map google={this.props.google}
            style={style}
            title={'A sample of water for pollution'}
            initialCenter={{
            lat: 31.104818,
            lng: 77.173401
          }}
            zoom={7}>

        {markers}
      </Map>
    );
    return (
      <Map google={this.props.google}
            style={style}
            title={'A sample of water for pollution'}
            initialCenter={{
            lat: 31.104818,
            lng: 77.173401
          }}
            zoom={10}>
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'
})(MapContainer)
