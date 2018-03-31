import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col} from "react-bootstrap";

import InfoCard from './info_card/InfoCard';
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
      wholeHeatmapData : SampleStore.getWholeHeatmapData()
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
    return (
      <div className="wrapper">

        <nav className="navbar navbar-default navbar-static-top">
          <div className="navbar-header">
            <i className="fa fa-tint fa-5x"></i>

            <p className="navbar-header-title">NIRA</p>
            <ul className="navbar-right">
              <li>
                <Searchbar />
              </li>
            </ul>
          </div>
        </nav>

        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h4 className="page-title">Dashboard</h4>
            </div>

            <div className="row">
                    <div className="col-lg-4 col-sm-6 col-xs-12">
                        <div className="white-box analytics-info">
                            <h3 className="box-title">Total Rivers</h3>
                            <ul className="list-inline two-part">
                                <li>
                                    <i className="fa fa-bar-chart"></i>
                                </li>
                                <li className="text-right"><i className="ti-arrow-up text-success"></i> <span className="text-success">210</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xs-12">
                        <div className="white-box analytics-info">
                            <h3 className="box-title">Total Reports</h3>
                            <ul className="list-inline two-part">
                                <li>
                                    <i className="fa fa-clipboard-list"></i>
                                </li>
                                <li className="text-right"><i className="ti-arrow-up text-purple"></i> <span className="text-purple">5687</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xs-12">
                        <div className="white-box analytics-info">
                            <h3 className="box-title">Critical conditions</h3>
                            <ul className="list-inline two-part">
                                <li>
                                    <i className="fa fa-exclamation-circle"></i>
                                </li>
                                <li className="text-right"><i className="ti-arrow-up text-info"></i> <span className="text-info">911</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
        <div className="container-fluid">
          <div className="component-card col-lg-12 col-md-12 col-sm-12">
            <MapContainer wholeHeatmapData = {this.state.wholeHeatmapData} />
          </div>
          <div className="component-card col-lg-12 col-md-12 col-sm-12">
            <InfoCard style={this.state.showInfoCard ? {display: 'block'} : { display: 'none' }}/>
          </div>
          <div className="row">
            <div className="component-card col-lg-6 col-md-6 col-sm-12">
              <LineChart />
            </div>
            <span className="col-lg-1 col-md-1 col-sm-1"></span>
            <div className="component-card col-lg-5 col-md-5 col-sm-12">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>


       /**<Searchbar/>
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


              <MapContainer wholeHeatmapData = {this.state.wholeHeatmapData}/>



              </Col>
            <Col sm={6} md={5} className="component-card">
              <h1>Info Card</h1>

                <InfoCard />
              <br />

            </Col>

            <Col sm={6} md={5} className="component-card">
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


     </div>**/
    )
  }
}

export default withRouter (Dashboard);
