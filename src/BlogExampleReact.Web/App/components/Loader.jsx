import React from "react";

var iconStyle = { fontSize: '16px', marginRight:'5px'};

export default class Loader extends React.Component {
    render() {
        return (
            <i style={iconStyle} className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        );
    }
}