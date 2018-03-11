import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row} from "react-bootstrap";
import Image_card from "./image_card/image_card";



class Dashboard extends Component {

  state = {
    samples : []
  }

  componentDidMount(){
    axios.get('http://localhost:4000/samples')
    .then(response => {
      console.log(response);
      this.setState({ samples: response.data });
    });
  }

  render() {
    const img = this.state.samples.map(sample => {
      return <Image_card src={sample.Image} state={sample.State} river={sample.River} time={sample.Time_Of_Sample}/>;
    });
    return (
     <div className="container">
        <Grid>
          <Row>
            {img}
          </Row>
        </Grid>
     </div>
    )
  }
}

export default Dashboard;
