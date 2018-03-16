import dispatcher from '../dispatcher';
import axios from 'axios';

export function searchRiver(river){
    let samples = []
    axios.get('http://localhost:4000/samples?River='+river)
    .then(response => {
      samples = response.data;
      dispatcher.dispatch(
        {
            type: "SEARCH_RIVER_COMPLETED",
            samples,
        });
    });
   

}