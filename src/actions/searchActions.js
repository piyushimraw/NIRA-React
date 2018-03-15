import dispatcher from '../dispatcher';

export function searchRiver(river){
    dispatcher.dispatch(
        {
            type: "SEARCH_RIVER",
            river,
        });
}