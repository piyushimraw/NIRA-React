import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col} from "react-bootstrap";

import LineChart from './charts/line_chart/LineChart';
import Navigation from './Navigation';
import PieChart from "./charts/pie_chart/PieChart";
import Searchbar from "./Searchbar";
import SampleStore from '../stores/SamplesStore';

import MapContainer from "./map/Map";
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';


import ImageCard from "./image_card/image_card";
import "./dashboard.css";

import * as HeatmapActions from '../actions/heatmapActions'
/**const LogOut = () => {
  return(
    <button type="button" onClick={this.logOut}>
      Logout
    </button>
  );
}**/



class Dashboard extends Component {


  // state = {
  //   samples : []`
  // }

  // componentWillMount(){
  //   axios.get('http://localhost:4000/samples')
  //   .then(response => {
  //     console.log(response);
  //     this.setState({ samples: response.data });
  //   });
  // }

  constructor(){
    super()
    this.state ={
      samples: SampleStore.getAll(),
      heatmap:false
    };

  }

  componentWillMount(){
    SampleStore.on('change', ()=> {
      this.setState({
        samples: SampleStore.getAll(),
      });
    });
  }

  setHeatmap(){
         HeatmapActions.toggleHeatmap();
  }


  logOut() {
    this.state = auth.doSignOut();
    //TODO component not updating, fix.
  }
  render() {
    const img = this.state.samples.map(sample => {
      return <ImageCard src={sample.Image}
                        state={sample.State}
                        river={sample.River}
                        time={sample.Time_Of_Sample}/>;
    });
    console.log('Heatmap state status in dashboard is:');
    console.log(this.state.heatmap);
    return (

     <div className="container-dashboard">

       <Searchbar/>
       //Temporary button.
         <button type="button" onClick={this.logOut.bind(this)}>
           Logout
         </button>
        <Grid>
          <Row>
            <Col sm={6} md={5} className="component-card">
              <h1>Map Card</h1>
              <button id = 'toggle-button' onClick = {this.setHeatmap.bind(this)}>Heatmap </button>
              <br />

              <MapContainer heatmap = {this.state.heatmap} />

            </Col>
            <Col sm={6} md={5} className="component-card">
              <h1>Info Card</h1>
              <br />
              /* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec elit nulla, facilisis nec facilisis eu, viverra fermentum nunc.
              Proin ut porttitor neque. Etiam eu libero viverra, sagittis dolor a, fermentum ex.
              In eu vulputate sapien. Ut dapibus augue ac ipsum lacinia tincidunt.
              Maecenas id imperdiet tellus.
              Duis sem ipsum, consequat molestie risus in, convallis facilisis dui.
              In arcu eros, sollicitudin ut magna eu, tempus ullamcorper purus.
              Sed pretium posuere tellus sit amet sodales.
              Pellentesque nisl odio, faucibus a placerat non, placerat at orci.
              Nam eget turpis varius, blandit lectus vel, pretium velit.
              Suspendisse sagittis convallis ipsum, eu malesuada enim. Curabitur feugiat pellentesque volutpat.
              Vestibulum mauris sem, vestibulum vitae lectus eu, faucibus finibus velit.
              Vestibulum sed egestas metus, sit amet sodales odio. Aliquam nibh eros, viverra in ultricies sit amet, mollis id justo.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Donec elit nulla, facilisis nec facilisis eu, viverra fermentum nunc.
             Proin ut porttitor neque. Etiam eu libero viverra, sagittis dolor a, fermentum ex.
             In eu vulputate sapien. Ut dapibus augue ac ipsum lacinia tincidunt.
             Maecenas id imperdiet tellus.
             Duis sem ipsum, consequat molestie risus in, convallis facilisis dui.
             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec elit nulla, facilisis nec facilisis eu, viverra fermentum nunc.
            Proin ut porttitor neque. Etiam eu libero viverra, sagittis dolor a, fermentum ex.
            In eu vulputate sapien. Ut dapibus augue ac ipsum lacinia tincidunt.
            Maecenas id imperdiet tellus.
              Vestibulum sed egestas metus, sit amet sodales odio. Aliquam nibh eros, viverra in ultricies sit amet, mollis id justo. */
            </Col>

            <Col sm={6} md={5} className="component-card">
              <h1>Pie Chart and Line Graph</h1>
              <br />

              <LineChart />
              <PieChart />
            </Col>

            <Col sm={6} md={5} className="component-card">
              <h1> Image gallery </h1>
              <br />
              {img}
            </Col>
          </Row>
        </Grid>


     </div>
    )
  }
}

export default withRouter (Dashboard);
