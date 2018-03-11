import React from 'react';
import {Col, Image} from 'react-bootstrap';

import './image_card.css';

const card =  (props) => (
    <Col xs={6} md={4}>
      <Image src={props.src} thumbnail />
      <p>Image Taken at {props.state} of {props.river} time:{props.time}</p>
    </Col>
)

export default card;