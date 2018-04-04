import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import * as MapActions from '../../actions/mapActions';
import  * as MLAction from '../../actions/mlaction';
import SampleStore from '../../stores/SamplesStore';
//import HeatMap from 'google-maps-react';
import RiverHeatmap from './riverHeatmap'
import MarkerMap from './markerMap'
import EmptyMap from './emptyMap'



//Trial
//import WithHeatMap from './heatMap';

const style = {
  width: '90%',
  height: '90%'
}




function heatPosition(heatmapData){
const heats_position = heatmapData.map(sample => {
  let obj = {};
  obj.lat = sample.coordinates.lat;
  obj.lng = sample.coordinates.long;
  console.log('heats_position object array');
  console.log(obj);
  return obj;
});
return heats_position;
}

function ConditinalMap(props){
    if(props.state.initial_load && props.state.heatmap_load)
    return(
      <EmptyMap heat_position = {props.props.wholeHeatmapData} />
    );

    else if(!props.state.heatmap_load && !props.state.initial_load)
    return (
      <MarkerMap markers = {props.markers}/>
 );

  else if(props.state.heatmap_load && !props.state.initial_load)
     return (
       <RiverHeatmap heatPosition = {heatPosition(props.state.heatmapData)} />
     );
}

export class MapContainer extends Component {

  constructor(){
    super();
    this.state = {
        markerData : [],
        heatmap_load : true,
        initial_load : true,
        heatmapData : []
    }
  }

  componentWillMount(){
    SampleStore.on('initial-render',() =>{
      console.log('Initial render in on statement called');
      this.setState(
        {
        heatmapData : SampleStore.getWholeHeatmapData()
      })
    });
    SampleStore.on('change',() =>{
      console.log('markerData is being set');
      this.setState({
          heatmap_load : false,
          initial_load :false,
          markerData : SampleStore.populateMarkerCoordinatesAndId()
      })
    });
    SampleStore.on('heatmap-clicked',() => {
      console.log('changing heatmap_loaded');
      this.setState(prevState => ({
        heatmap_load:!prevState.heatmap_load,
        heatmapData : SampleStore.getHeatmapData()
      }))
    });

  }
s
  onMarkerClick = (props,marker,e) => {
        //props.id
        console.log('Marker id:');
        console.log(props.id);
     MapActions.useMapData(props.id);
     MLAction.fetchML(marker.id);
}

render() {
  const markers = this.state.markerData.map(marker => {
    return <Marker onClick={this.onMarkerClick}
             position={{lat : marker.coordinates.lat,lng : marker.coordinates.long}}
             id = {marker.id}
             name={'Sample'} />
  });

      return (
        <ConditinalMap state={this.state} props={this.props} markers = {markers}/>
      )

  // const heats_gradient = this.state.heatmapData.map(sample => {
  //   return this.findHeatmapStrength(sample.Temperature);
  // });



    // if(!this.state.initial_load && this.state.heatmap_load)
    // return(
    //
    // );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'
})(MapContainer)
