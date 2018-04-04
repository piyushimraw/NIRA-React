import dispatcher from '../dispatcher';
import axios from 'axios';

export function fetchML(river){
    var dataE = {};
    dataE.pH = 4;
    dataE.Disolved_Oxygen=15;
    dataE.Alkalinity= 47;
    dataE.fColiform= 121;
    dataE.nitrates= 4;
    dataE.phosphates= 1; 
    dataE.turbidity= 3;
    console.log(dataE);
    var jsonData = JSON.stringify(dataE);
    axios({
        method: 'post',
        url: 'http://localhost:8080/model',
        data: dataE,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then( response => {
        console.log("response"+response);
    })
}


