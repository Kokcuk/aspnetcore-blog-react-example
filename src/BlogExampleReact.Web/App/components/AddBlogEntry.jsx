import React from 'react';
import * as requestStatus from '../constants/RequestStatus';
import Loader from './loader';

var inputStyle = { width: '300px', marginBottom:'5px'};

export default class AddBlogEntry extends React.Component {
    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddBlogEntry = this.handleAddBlogEntry.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

  render() {
        return (
            <div>
                <h4>Add blog entry</h4>
                <input style={inputStyle} className="form-control" onChange={this.handleTitleChange} ref="title" type="text" placeholder="title"/>
                <textarea style={inputStyle} rows="5" className="form-control" ref="text" onChange={this.handleTextChange} placeholder="text"></textarea>

                <button onClick={this.handleAddBlogEntry} className="btn btn-success">
                {this.props.requestStatus === requestStatus.STARTED ? <Loader/>:""}
                Add</button>
                
            </div>
        );
      }
    
      handleTitleChange(e) {
          this.setState({title: e.target.value});
      }

      handleTextChange(e) {
          this.setState({text: e.target.value});
      }

      clearForm() {
          this.refs.title.value = "";
          this.refs.text.value = "";
      }

      handleAddBlogEntry(e) {
          this.clearForm();
          var blogEntry = {title: this.state.title, text: this.state.text};
          this.props.addBlogEntry(blogEntry);
      }


}

