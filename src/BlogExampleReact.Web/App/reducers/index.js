import { combineReducers } from 'redux';
import blog from './BlogReducer';

const rootReducer = combineReducers({
    blog: blog
});

export default rootReducer;