import {EventEmitter} from 'events';
import axios from 'axios';
import dispatcher from '../dispatcher';

class SamplesStore extends EventEmitter {

    constructor(){
        super();
        this.samples = [];

    }

    getAll() {
        return this.samples;
    }


    searchRiver = (river) => {
        axios.get('http://localhost:4000/samples?River='+river)
          .then(response => {
            console.log(response);
            this.samples = response.data;
            this.emit('change');
          });
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
            case 'SEARCH_RIVER' : 
                actions.river = this.capitalizeFirstLetter(actions.river);
                this.searchRiver(actions.river)
        }

    }
}

const samplesStore = new SamplesStore;

dispatcher.register(samplesStore.handleActions.bind(samplesStore));

export default samplesStore;