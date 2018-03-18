import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./map.css";

const AnyReactComponent = ({ text }) => <div className="sample-text">{text}<div className="sample-point"></div></div>;

class SimpleMap extends Component {


  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 13
  };

  render() {
      //if heatmap button is not clicked
      if(!this.props.checkHeatmap)
        {
          console.log(this.props.checkHeatmap);
    return (

          <div style={{height: '400px', width: '400px'}}>
        <GoogleMapReact
       defaultCenter={this.props.center}
       defaultZoom={this.props.zoom}
     >
       <AnyReactComponent
         lat={59.955413}
         lng={30.337844}
         text={'Sample1'}
       />
       <AnyReactComponent
         lat={59.959100}
         lng={30.338673}
         text={'Sample2'}
       />
       <AnyReactComponent
         lat={59.952980}
         lng={30.332671}
         text={'Sample3'}
       />
     </GoogleMapReact>
   </div>
);
}//end of if

    if(this.props.checkHeatmap)
    {
      console.log(this.props.checkHeatmap);
        return(
      <div style={{height: '400px', width: '400px'}}>
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        heatmapLibrary={true}
    heatmap={{
      positions: [
        {
          lat: 59.955413,
          lng: 30.337844,
        },
        {
          lat: 59.959100,
          lng: 30.338676,
        },
        {
          lat:59.957912,
          lng: 30.335901,
        },
      ],
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
    </div>
    );
    }
  }
}
export default SimpleMap
