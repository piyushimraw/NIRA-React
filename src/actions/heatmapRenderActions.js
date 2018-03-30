import dispatcher from '../dispatcher';
import axios from 'axios';

let allsamples = []
export function setHeatmap(){
  axios.get('http://localhost:4000/samples')
  .then(response => {
    allsamples = response.data;
    dispatcher.dispatch(
      {
          type : 'INITIAL-HEATMAP',
          allsamples
      }
    )});

}
