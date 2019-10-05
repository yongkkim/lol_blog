import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./main.css";

class Main extends Component {
    render() {
        return (
            <div id="main-container">
                <CSSTransition
                    in
                    classNames="background"
                    appear={true}
                    timeout={2000}
                >
                    <img id="league-bg" src={require("../../../public/resource/logo.png")} />
                </CSSTransition>
                <h1 id="sub-title">My Champion Collections</h1>
            </div>
        );
    }
}

export default Main;