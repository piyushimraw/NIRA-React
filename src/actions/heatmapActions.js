import dispatcher from '../dispatcher';


export function toggleHeatmap(){
    dispatcher.dispatch(
        {
            type: "TOGGLE-HEATMAP"

        });
}
