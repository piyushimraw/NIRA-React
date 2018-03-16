import dispatcher from '../dispatcher';

export function sendDataToPieChart(_index){
    dispatcher.dispatch(
        {
            type: "SEND_DATA_TO_PIE_CHART",
            _index,
        });
}