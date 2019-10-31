import React, { Component } from "react";
import { CSSTransition, ReactCSSTransisionGroup } from 'react-transition-group';
import "./primary.css";

class Primary extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            clicked: false,
            clickedChampSkills: this.props.clickedChampSkills,
            selectedChamp: this.props.selectedChamp,
            allGroup: [],
            selectedGroup: [],
            allTitle: this.props.title,
            selectedTitle: this.props.title[0],
            nthGroup: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clicked !== this.state.clicked) {
            this.setState({
                clicked: nextProps.clicked,
                selectedChamp: nextProps.selectedChamp,
                clickedChampSkills: nextProps.clickedChampSkills
            });
        } else {
            this.setState({
                selectedChamp: nextProps.selectedChamp,
                clickedChampSkills: nextProps.clickedChampSkills
            });
        }
    }

    componentDidMount() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && window.innerWidth < 450) {
            document.getElementById("primary-container").style.webkitBackgroundSize = "100% 50%";
        }

        let allchampgroups = this.props.allChamps;
        if (!this.state.clicked) {
            this.setState({
                allGroup: allchampgroups,
                selectedGroup: allchampgroups[0],
                nthGroup: 0
            })
        }
    }

    previousList = () => {
        document.getElementById("champImg").style.opacity = "0"
        if (this.state.nthGroup === 0) {
            this.setState({
                selectedGroup: this.props.allChamps[this.state.allGroup.length - 1],
                nthGroup: this.state.allGroup.length - 1,
                selectedTitle: this.state.allTitle[this.state.allGroup.length - 1],
            }, this.props.clickedStatus())
        } else {
            this.setState({
                selectedGroup: this.state.allGroup[this.state.nthGroup - 1],
                nthGroup: this.state.nthGroup - 1,
                selectedTitle: this.state.allTitle[this.state.nthGroup - 1],
            }, this.props.clickedStatus())
        }
    }

    nextList = () => {
        document.getElementById("champImg").style.opacity = "0"
        if (this.state.nthGroup === this.state.allGroup.length - 1) {
            this.setState({
                selectedGroup: this.state.allGroup[0],
                nthGroup: 0,
                selectedTitle: this.state.allTitle[0],
            }, this.props.clickedStatus())
        } else {
            this.setState({
                selectedGroup: this.state.allGroup[this.state.nthGroup + 1],
                nthGroup: this.state.nthGroup + 1,
                selectedTitle: this.state.allTitle[this.state.nthGroup + 1],
            }, this.props.clickedStatus())
        }
    }

    render() {
        return (
            <div id="primary-container" className={this.state.nthGroup === 0 ? "one" : this.state.nthGroup === 1 ? "two" : "three"}>
                <h1 id="title" style={{ color: this.state.nthGroup === 1 ? '#ffb800' : "lightblue" }}>{this.state.selectedTitle}</h1>
                <div id="desc-box">
                    <div id="desc" style={{ color: this.state.nthGroup === 1 ? '#ffb800' : "lightblue" }} className={this.state.clicked ? "display" : "none"}>
                        <div id="button-container">
                            <div className="button preference" onClick={e => this.props.showOpinion()}>Opinion</div>
                            <div className="button skill" onClick={e => this.props.showSkill()}>Skillset</div>
                        </div>
                        <div id="opinion-container">
                            <p id="opinion"></p>
                        </div>
                        <div id="skillset">
                            <ul id="skill-img">
                                {this.state.clickedChampSkills}
                                <div id="desc-container">
                                    <div id="skill-desc" style={{ color: this.state.nthGroup === 1 ? '#ffb800' : "lightblue" }}></div>
                                </div>
                            </ul>
                            <div id="video-container">
                                <p id="video-title">Best Plays</p>
                                <iframe id="video" frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="left" onClick={e => { this.previousList() }}></div>
                </div>
                <ul className="primary-champ">
                    {this.state.selectedGroup}
                </ul>
                <div id="img-box">
                    <div className="right" onClick={e => { this.nextList() }}></div>
                    <img id="border-img" src={require("../../../public/resource/modi_challenger.png")}></img>
                    <img id="champImg"></img>
                </div>
            </div>
        );
    }
}

export default Primary;