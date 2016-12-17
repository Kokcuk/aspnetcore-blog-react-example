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
            if (action.status === requestStatus.SUCCESS) {
                return {
                    ...state,
                    addRequestStatus: action.status,
                    blogEntries: [
                        action.blogEntry,
                        ...state.blogEntries
                    ]
                }
            } else {
                return {
                ...state,
                    addRequestStatus: action.status
                }
            }
        case types.FETCH_BLOG_ENTRIES:
            return {
                ...state,
                fetchRequestStatus: action.status,
                blogEntries: action.status === requestStatus.SUCCESS ? action.blogEntries:[]
            }
        case types.DELETE_BLOG_ENTRY:
            if (action.status === requestStatus.SUCCESS) {
                return {
                    ...state,
                    blogEntries: state.blogEntries.filter(b => b.id !== action.id)
                }
            } else {
                return state;
            }
        default:
            return state;
    }
}
