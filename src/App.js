import React, { Component, useState } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Primary from "./components/primary/primary.js";
import Secondray from "./components/secondary/secondary.js";
import Future from "./components/future/future.js";
import Contact from "./components/contact/contact.js";
import { CSSTransition, ReactCSSTransitionGroup } from 'react-transition-group';
import axios from 'axios';

class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            bar: false,
            images: [],

        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        axios.get("https://ddragon.leagueoflegends.com/cdn/9.17.1/data/en_US/champion.json")
            .then(response => {
                this.setState({ images: response.data.data });
            });
    }

    // UNSAFE_componentWillMount() {
    //     axios.get("https://ddragon.leagueoflegends.com/cdn/9.17.1/data/en_US/champion.json")
    //         .then(response => {
    //             this.setState({ images: response.data.data });
    //         });
    // }

    handleScroll = () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            - document.getElementById("main").offsetHeight;

        if (winScroll > document.getElementById("main").offsetHeight - 200) {
            if (!this.state.bar) {
                this.setState({
                    bar: true
                })
            }

            let scrolled = ((winScroll - document.getElementById("main").offsetHeight) / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";

        } else {
            if (this.state.bar) {
                this.setState({
                    bar: false
                })
            }
        }
    }

    render() {
        let pImageURL = [];
        let sImageURL = [];
        let fImageURL = [];
        let primary = ["Lux", "Leblanc", "Blitzcrank", "Orianna", "Ahri", "Thresh"];
        let secondary = ["Syndra", "Rumble", "Kennen", "Ezreal", "Karma", "Gragas"];
        let future = ["Qiyana", "Sylas", "Pyke", "Kaisa", "Vayne", "Akali"];
        let keys = Object.keys(this.state.images);

        primary.forEach(p => {
            if (keys.indexOf(p) > -1) {
                pImageURL.push({
                    url: "https://ddragon.leagueoflegends.com/cdn/9.18.1/img/champion/" + this.state.images[p].image.full,
                    name: this.state.images[p].name
                });
            }
        })

        secondary.forEach(s => {
            if (keys.indexOf(s) > -1) {
                sImageURL.push({
                    url: "https://ddragon.leagueoflegends.com/cdn/9.18.1/img/champion/" + this.state.images[s].image.full,
                    name: this.state.images[s].name
                });
            }
        })

        future.forEach(f => {
            if (keys.indexOf(f) > -1) {
                fImageURL.push({
                    url: "https://ddragon.leagueoflegends.com/cdn/9.18.1/img/champion/" + this.state.images[f].image.full,
                    name: this.state.images[f].name
                });
            }
        })

        return (
            <ul className="list">
                <CSSTransition
                    in={this.state.bar}
                    timeout={500}
                    classNames="progress"
                    unmountOnExit
                >
                    <div className="progress-container">
                        <div className="progress-bar" id="myBar"></div>
                    </div>
                </CSSTransition>
                <li id="main"><Main /></li>
                <li id="primary"><Primary images={pImageURL} /></li>
                <li id="secondary"><Secondray images={sImageURL} /></li>
                <li id="future"><Future images={fImageURL} /></li>
                <li id="contact"><Contact /></li>
            </ul>
        );
    }
}

export default App;