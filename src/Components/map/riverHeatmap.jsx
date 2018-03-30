import React,{Component} from 'react';
import GoogleMapReact from 'google-map-react';

const style = {
  width: '90%',
  height: '90%'
}

export default class RiverHeatmap extends Component{

  static defaultProps = {
    center: {lat: 31.104818, lng: 77.173401},
    zoom: 11
  };

    constructor(props){
      super(props);


    }

    render(){

      return(
        <GoogleMapReact
         bootstrapURLKeys={{ key: 'AIzaSyCny5Ok9iHLVB7N0jL7Tx47uoXdINLC5FI'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          style = {style}
          heatmapLibrary={true}
      heatmap={{
        positions: {...this.props.heatPosition},
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
    }

}
