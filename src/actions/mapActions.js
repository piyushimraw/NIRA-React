import dispatcher from '../dispatcher';

export function useMapData(markerid){
    dispatcher.dispatch(
        {
            type: "USE-MAP-DATA",
            markerid,
        });
}
