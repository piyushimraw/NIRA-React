import dispatcher from '../dispatcher';
import axios from 'axios';

export function setHeatmap(){
  let samples = []
  axios.get('http://localhost:4000/samples')
  .then(response => {
    samples = response.data;
    dispatcher.dispatch(
      {
          TYPE : "INITIAL-HEATMAP",
          samples
      }
    )});

}
