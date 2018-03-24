import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as MapActions from '../../actions/mapActions';
import SampleStore from '../../stores/SamplesStore';
import GoogleMapReact from 'google-map-react';
import HeatMap from 'google-maps-react';


//Trial
import WithHeatMap from './heatMap';

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

      {lat: 37.782551, lng: -122.445368},

      {lat: 37.782745, lng: -122.444586},

      {lat: 37.782842, lng: -122.443688},

      {lat: 37.782919, lng: -122.442815},

      {lat: 37.782992, lng: -122.442112},

      {lat: 37.783100, lng: -122.441461},

      {lat: 37.783206, lng: -122.440829},

      {lat: 37.783273, lng: -122.440324},

      {lat: 37.783316, lng: -122.440023},

      {lat: 37.783357, lng: -122.439794},

      {lat: 37.783371, lng: -122.439687},

      {lat: 37.783368, lng: -122.439666},

      {lat: 37.783383, lng: -122.439594},

      {lat: 37.783508, lng: -122.439525},

      {lat: 37.783842, lng: -122.439591},

      {lat: 37.784147, lng: -122.439668}

    ];

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const style = {
  width: '450px',
  height: '450px'
}

export class MapContainer extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  constructor(){
    super();
    this.state = {
        markerData : [],
        initial_load : true,
        heatmap_load : false,
        heatmapData : []
    }
  }

  componentWillMount(){
    SampleStore.on('change',() =>{
      this.setState({
          initial_load : false,
          markerData : SampleStore.populateMarkerCoordinatesAndId()
      })
    })
    SampleStore.on('heatmap-clicked',() => {
      this.setState({
        initial_load:false,
        heatmap_load:true,
        heatmapData : SampleStore.getHeatmapData()
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
    if(!this.state.initial_load && !this.state.heatmap_load)
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

     if(this.state.initial_load)
    return (
      <Map google={this.props.google}
            style={style}
            title={'A sample of water for pollution'}
            initialCenter={{
            lat: 31.104818,
            lng: 77.173401}}
            zoom={10}>
      </Map>
    );
    if(!this.state.initial_load && this.state.heatmap_load)
    return(
      <GoogleMapReact
       bootstrapURLKeys={{ key: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style = {{style}}
        heatmapLibrary={true}
    heatmap={{
      positions: [
        {
          lat: 60.714305,
          lng: 47.051773,
        },
        {
          lat: 60.734305,
          lng: 47.061773,
        },
        {
          lat: 60.754305,
          lng: 47.081773,
        },
      ],
      options: {
        radius: 20,
        opacity: 0.7,
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
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI',
})(MapContainer)
