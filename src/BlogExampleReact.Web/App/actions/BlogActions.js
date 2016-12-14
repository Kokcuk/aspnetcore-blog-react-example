import * as types from '../constants/ActionTypes';
import * as requestStatus from '../constants/RequestStatus';
import axios from 'axios';


export function addBlogEntry(blogEntry) {
    return (dispatch) => {
        dispatch({type:types.ADD_BLOG_ENTRY, status:requestStatus.STARTED});

        axios.post('api/post/AddOrUpdate', blogEntry)
        .then(function(response) {
                dispatch({type:types.ADD_BLOG_ENTRY, status:requestStatus.SUCCESS});
                dispatch(fetchBlogEntries());

            }).catch(function (error) {
            dispatch({type:types.ADD_BLOG_ENTRY, status:requestStatus.FAIL});
                console.log(error);
            });
    };
}

export function fetchBlogEntries() {
    return (dispatch) => {
        dispatch({type:types.FETCH_BLOG_ENTRIES, status:requestStatus.STARTED});
        axios.get('api/post/list')
        .then(function(response) {
            dispatch({type:types.FETCH_BLOG_ENTRIES, status:requestStatus.SUCCESS, blogEntries: response.data});
        })
        .catch(function (error) {
            dispatch({type:types.FETCH_BLOG_ENTRIES, status:requestStatus.FAIL});
            console.log(error);
        });
    };
}

export function saveBlogEntry(blogEntry) {
    return (dispatch) => {
        dispatch({type:types.UPDATE_BLOG_ENTRY, status:requestStatus.STARTED});

        axios.post('api/post/AddOrUpdate', blogEntry)
        .then(function(response) {
            dispatch({type:types.UPDATE_BLOG_ENTRY, status:requestStatus.SUCCESS});
            dispatch(fetchBlogEntries());

        }).catch(function (error) {
            dispatch({type:types.UPDATE_BLOG_ENTRY, status:requestStatus.FAIL});
            console.log(error);
        });
    };
}

export function deleteBlogEntry(id) {
    return (dispatch) => {
        dispatch({type:types.DELETE_BLOG_ENTRY, status:requestStatus.STARTED});

        axios.post('api/post/delete', {id:id})
        .then(function(response) {
            dispatch({type:types.DELETE_BLOG_ENTRY, status:requestStatus.SUCCESS});
            dispatch(fetchBlogEntries());

        }).catch(function (error) {
            dispatch({type:types.DELETE_BLOG_ENTRY, status:requestStatus.FAIL});
            console.log(error);
        });
    };
}

