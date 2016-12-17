import React from "react";
import AddBlogEntry from "../components/AddBlogEntry";
import BlogEntry from "../components/BlogEntry";
import { connect } from 'react-redux';
import * as actions from '../actions/BlogActions';
import { bindActionCreators } from 'redux';
import * as requestStatus from '../constants/RequestStatus';
import DevTools from './DevTools';
import Loader from '../components/loader';
import FlipMove from 'react-flip-move';


class Root extends React.Component {
    componentDidMount() {
        this.props.actions.fetchBlogEntries();
    }

    render() {
        const items = this.props.blogEntries.map(function(val, i) {
                        return <BlogEntry deleteBlogEntry={this.props.actions.deleteBlogEntry} saveBlogEntry={this.props.actions.saveBlogEntry} key={val.id} blogEntry={val} />;
                    },this);
        return (
          <div>
            <h2>Blog entries</h2>
            {this.props.fetchRequestStatus === requestStatus.STARTED ? <Loader/>:
                 <div>
                     <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
                        {items}
                    </FlipMove>
                 </div>
            }
              
              {userAuthorized?<AddBlogEntry requestStatus={this.props.addRequestStatus} addBlogEntry={this.props.actions.addBlogEntry}></AddBlogEntry>:<span>Authorize to add posts</span>}
              
            {/*<DevTools />*/}
          </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        blogEntries: state.blog.blogEntries,
        addRequestStatus: state.blog.addRequestStatus,
        fetchRequestStatus: state.blog.fetchRequestStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)