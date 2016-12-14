import * as types from '../constants/ActionTypes';
import * as requestStatus from '../constants/RequestStatus';

const initialState = {
    blogEntries: [],
    addRequestStatus: requestStatus.IDLE,
    fetchRequestStatus: requestStatus.IDLE
}

export default function blogApp(state = initialState, action) {
    switch (action.type) {
        case types.ADD_BLOG_ENTRY:
            return {
                ...state,
                addRequestStatus: action.status
            }
        case types.FETCH_BLOG_ENTRIES:
            console.log(action);
            return {
                ...state,
                fetchRequestStatus: action.status,
                blogEntries: action.status === requestStatus.SUCCESS ? action.blogEntries:[]
            }
        default:
            return state;
    }
}
