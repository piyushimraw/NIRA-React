import {EventEmitter} from 'events';
import axios from 'axios';
import dispatcher from '../dispatcher';

class SamplesStore extends EventEmitter {

    constructor(){
        super();
        this.samples = [];
        this.pieData = {};
        this.markerData = [];
        this.id = [];
        this.heatmapData = [];
        this.infoData= [];
        this.wholeHeatmapData = [];

    }

    getAll() {
        return this.samples;
    }


    searchRiver = (samples) => {
        // axios.get('http://localhost:4000/samples?River='+river)
        //   .then(response => {
        //     console.log(response);
        //     this.samples = response.data;
        this.samples = samples;
        this.emit('change');
    }



    populateMarkerCoordinatesAndId = () => {

    this.markerData = this.samples.map(sample =>  {
      let obj = {};
      obj.coordinates = sample.Cordinates;
      obj.id = sample.id;
      console.log(obj);
      return obj;
    });
    console.log(this.markerData);
    return this.markerData;
    }

    toggleHeatmap(){
      this.heatmapData = this.samples.map(sample => {
        let obj = {};
        obj.coordinates = sample.Cordinates;
        obj.temperature = sample.Temperature;
        return obj;
      });
      this.emit('heatmap-clicked');
    }

    initialHeatmap(allsamples){
      console.log('Samplestore initialheatmap called');
      this.wholeHeatmapData = allsamples;
      console.log(this.wholeHeatmapData);
      this.emit('initial-render');
    }

    getWholeHeatmapData(){
      return this.wholeHeatmapData;
    }

    getHeatmapData(){
      return this.heatmapData;
    }
    getPieData(){
        return this.pieData;
    }

    updatePieData(index){
        console.log(index);
        this.pieData = this.samples[index].Water_Quality_Indicators.Dissolved_Metals_and_Salts;
        this.pieData = {...this.pieData, "Oxygen": this.samples[index].Water_Quality_Indicators.Disolved_Oxygen};
        console.log(this.pieData);
        this.emit('pieDataChange');
    }


    useMapData(markerid){
        console.log('The clicked marker was : '+ markerid);

          this.infoData = this.samples.filter(sample => {
              if(sample.id === markerid) return sample;
          });
          this.emit('changeInfo');
    }


//Function to Capitalize the first Letter of search parameter
capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


    getInfoData(){
        return this.infoData;
    }


//Function to Capitalize the first Letter of search parameter
// capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }


//Handle Actions Methods
    handleActions(actions) {
        console.log("SampleStore recived an action", actions);


        //Add switch action for every action we need to do.
        switch(actions.type){
            case 'SEARCH_RIVER_COMPLETED' :
                this.searchRiver(actions.samples);
                break;
            case 'SEND_DATA_TO_PIE_CHART':
                this.updatePieData(actions._index);
                break;
            case 'USE-MAP-DATA':
                this.useMapData(actions.markerid);
                break;
            case 'INITIAL-HEATMAP':
                this.initialHeatmap(actions.allsamples);
                break;
            case 'TOGGLE-HEATMAP':
                this.toggleHeatmap();
                break;



        }

    }
}

const samplesStore = new SamplesStore;

dispatcher.register(samplesStore.handleActions.bind(samplesStore));

export default samplesStore;
