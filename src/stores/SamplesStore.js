import {EventEmitter} from 'events';
import axios from 'axios';
import dispatcher from '../dispatcher';

class SamplesStore extends EventEmitter {

    constructor(){
        super();
        this.samples = [];
        this.pieData = {};

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


//Function to Capitalize the first Letter of search parameter 
capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



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

        }

    }
}

const samplesStore = new SamplesStore;

dispatcher.register(samplesStore.handleActions.bind(samplesStore));

export default samplesStore;