import React from "react";

var containerStyle = {
    'marginBottom':'25px',
    'background':'#e6e6e6',
    'padding':'5px',
    'borderRadius':'3px'
};
var editButtonStyle = {'marginLeft':'10px'};
var inputStyle = { 'width': '300px', 'display':'inline' };
var textareaStyle = { 'width': '300px' };

export default class BlogEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            title: props.blogEntry.title,
            text: props.blogEntry.text
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        let content = null;
        if(this.state.isEditMode) {
            content = <div>
                          <h4><input ref="title" style={inputStyle} onChange={this.handleTitleChange} className="form-control" defaultValue={this.props.blogEntry.title}/> 
                          <a onClick={this.handleDeleteClick} className="btn btn-danger btn-xs pull-right" style={editButtonStyle}>Delete</a>
                          <a onClick={this.handleSaveClick} className="btn btn-primary btn-xs pull-right" style={editButtonStyle}>Save</a>
                          
                              <small className="pull-right">{this.props.blogEntry.createDate}</small></h4> 
                            <textarea ref="text" className="form-control" onChange={this.handleTextChange} style={textareaStyle} defaultValue={this.props.blogEntry.text}></textarea>
                            <small>holla</small>  
                      </div>;
        } else {
            content = <div>
                          <h4>{this.props.blogEntry.title} 
                            {userAuthorized?<a onClick={this.handleEditClick} className="btn btn-primary btn-xs pull-right" style={editButtonStyle}>Edit</a>:""}
                               
                              <small className="pull-right">{this.props.blogEntry.createDate}</small></h4>
                            <p>{this.props.blogEntry.text}</p>
                            <small>holla</small>  
                      </div>;
        }
        return (
             <div style={containerStyle}>
                  {content}
             </div>
        );
}

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }        

    handleEditClick(e) {
        this.setState({isEditMode:true});
    }

    handleSaveClick(e) {
        var title = this.state.title;
        var text = this.state.text;
        var id = this.props.blogEntry.id;

        var blogEntry = {title: title, text: text, id: id};
        this.props.saveBlogEntry(blogEntry);
    }

    handleDeleteClick(e) {
        this.props.deleteBlogEntry(this.props.blogEntry.id);
    }
}