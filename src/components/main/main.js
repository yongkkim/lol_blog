import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./main.css";

class Main extends Component {

    componentDidMount() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && window.innerWidth < 450) {
            document.getElementById("sub-title").style.fontSize = "20px";
        }
    }

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