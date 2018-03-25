import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as MapActions from '../../actions/mapActions';
import SampleStore from '../../stores/SamplesStore';
import GoogleMapReact from 'google-map-react';
import HeatMap from 'google-maps-react';


//Trial
//import WithHeatMap from './heatMap';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const style = {
  width: '90%',
  height: '90%'
}

export class MapContainer extends Component {
  static defaultProps = {
    center: {lat: 31.104818, lng: 77.173401},
    zoom: 13
  };

  constructor(){
    super();
    this.state = {
        markerData : [],
        heatmap_load : true,
        heatmapData : SampleStore.getWholeHeatmapData()
    }
  }

  componentWillMount(){
    SampleStore.on('change',() =>{
      this.setState({
          heatmap_load : false,
          markerData : SampleStore.populateMarkerCoordinatesAndId()
      })
    })
    SampleStore.on('heatmap-clicked',() => {
      console.log('changing heatmap_loaded');
      this.setState(prevState => ({
        heatmap_load:!prevState.heatmap_load,
        heatmapData : SampleStore.getHeatmapData()
      }))
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
  findHeatmapStrength(temperature){
    let temp = parseInt(temperature);
    if(temp <= 5)
      return 'rgba(0, 255, 255, 0)'
    else if(temp >5 && temp <= 10)
      return 'rgba(0, 191, 255, 1)'
    else if(temp > 10 && temp <=15)
      return 'rgba(0, 127, 255, 1)'
    else if(temp >15 && temp <=20)
      return 'rgba(0, 0, 255, 1)'
    else if(temp >20 && temp <=22)
      return 'rgba(0, 0, 191, 1)'
    else if(temp >22 && temp <=30)
      return 'rgba(0, 0, 127, 1)'
    else if(temp >30 && temp <=37)
      return 'rgba(63, 0, 91, 1)'
    else if(temp >37 && temp <=42)
      return 'rgba(191, 0, 31, 1)'
    else
      return 'rgba(255, 0, 0, 1)'

  }

render() {
  const markers = this.state.markerData.map(marker => {
    return <Marker onClick={this.onMarkerClick}
             position={{lat : marker.coordinates.lat,lng : marker.coordinates.long}}
             id = {marker.id}
             name={'Sample'} />
  });

  const heats_position = this.state.heatmapData.map(sample => {
    let obj = {};
    obj.lat = sample.coordinates.lat;
    obj.lng = sample.coordinates.long;
    return obj;
  });
  const heats_gradient = this.state.heatmapData.map(sample => {
    return this.findHeatmapStrength(sample.Temperature);
  });
  console.log('heats_position is');
  console.log(heats_position);

  if(this.state.heatmap_load)
 return (
   // <Map google={this.props.google}
   //       style={style}
   //       title={'A sample of water for pollution'}
   //       initialCenter={{
   //       lat: 31.104818,
   //       lng: 77.173401}}
   //       zoom={10}>
   // </Map>
   <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'}}
     defaultCenter={this.props.center}
     defaultZoom={this.props.zoom}
     style = {style}
     heatmapLibrary={true}
 heatmap={{
   positions: heats_position ,
   options: {
     radius: 20,
     opacity: 0.5,
     gradient: [
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
     ]
   },
 }}
   >
   </GoogleMapReact>
 );

    if(!this.state.heatmap_load)
     return (
       <Map google={this.props.google}
             style={style}
             title={'A sample of water for pollution'}
             initialCenter={{
             lat: 31.104818,
             lng: 77.173401}}
             zoom={7}>
         {markers}
       </Map>
     );


    // if(!this.state.initial_load && this.state.heatmap_load)
    // return(
    //
    // );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'
})(MapContainer)
