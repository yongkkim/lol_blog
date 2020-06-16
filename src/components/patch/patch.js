import React, { Component } from "react";
import { connect } from 'react-redux';
import { } from '../../js/actions/index';
import "./patch.css";

class Patch extends Component {
    constructor(prop) {
        super(prop);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="patch-container" className="container">

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patch);