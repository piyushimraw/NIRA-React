import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col} from "react-bootstrap";

import Searchbar from "./Searchbar"

import ImageCard from "./image_card/image_card";
import "./dashboard.css";


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
      return <ImageCard src={sample.Image} state={sample.State} river={sample.River} time={sample.Time_Of_Sample}/>;
    });
    return (

     <div className="container-dashboard">
       <Searchbar/>
        <Grid>
          <Row>
            <Col sm={6} md={9} className="component-card">
              <h1>Map Card</h1>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit nulla, facilisis nec facilisis eu, viverra fermentum nunc. Proin ut porttitor neque. Etiam eu libero viverra, sagittis dolor a, fermentum ex. In eu vulputate sapien. Ut dapibus augue ac ipsum lacinia tincidunt. Maecenas id imperdiet tellus. Duis sem ipsum, consequat molestie risus in, convallis facilisis dui. In arcu eros, sollicitudin ut magna eu, tempus ullamcorper purus. Sed pretium posuere tellus sit amet sodales. Pellentesque nisl odio, faucibus a placerat non, placerat at orci. Nam eget turpis varius, blandit lectus vel, pretium velit. Suspendisse sagittis convallis ipsum, eu malesuada enim. Curabitur feugiat pellentesque volutpat. Vestibulum mauris sem, vestibulum vitae lectus eu, faucibus finibus velit. Vestibulum sed egestas metus, sit amet sodales odio. Aliquam nibh eros, viverra in ultricies sit amet, mollis id justo.
            </Col>
            <Col sm={6} md={3} className="component-card">
              <h1>Info Card</h1>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit nulla, facilisis nec facilisis eu, viverra fermentum nunc. Proin ut porttitor neque. Etiam eu libero viverra, sagittis dolor a, fermentum ex. In eu vulputate sapien. Ut dapibus augue ac ipsum lacinia tincidunt. Maecenas id imperdiet tellus. Duis sem ipsum, consequat molestie risus in, convallis facilisis dui. In arcu eros, sollicitudin ut magna eu, tempus ullamcorper purus. Sed pretium posuere tellus sit amet sodales. Pellentesque nisl odio, faucibus a placerat non, placerat at orci. Nam eget turpis varius, blandit lectus vel, pretium velit. Suspendisse sagittis convallis ipsum, eu malesuada enim. Curabitur feugiat pellentesque volutpat. Vestibulum mauris sem, vestibulum vitae lectus eu, faucibus finibus velit. Vestibulum sed egestas metus, sit amet sodales odio. Aliquam nibh eros, viverra in ultricies sit amet, mollis id justo.
            </Col>
            <Col sm={6} md={6} className="component-card">
              <h1>Pie Chart and Line Graph</h1>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit nulla, facilisis nec facilisis eu, viverra fermentum nunc. Proin ut porttitor neque. Etiam eu libero viverra, sagittis dolor a, fermentum ex. In eu vulputate sapien. Ut dapibus augue ac ipsum lacinia tincidunt. Maecenas id imperdiet tellus. Duis sem ipsum, consequat molestie risus in, convallis facilisis dui. In arcu eros, sollicitudin ut magna eu, tempus ullamcorper purus. Sed pretium posuere tellus sit amet sodales. Pellentesque nisl odio, faucibus a placerat non, placerat at orci. Nam eget turpis varius, blandit lectus vel, pretium velit. Suspendisse sagittis convallis ipsum, eu malesuada enim. Curabitur feugiat pellentesque volutpat. Vestibulum mauris sem, vestibulum vitae lectus eu, faucibus finibus velit. Vestibulum sed egestas metus, sit amet sodales odio. Aliquam nibh eros, viverra in ultricies sit amet, mollis id justo.
            </Col>
            <Col sm={6} md={6} className="component-card">
              <h1> Image galery </h1>
              <br />
              {img}
            </Col>
          </Row>
        </Grid>
     </div>
    )
  }
}

export default Dashboard;
