import React, { Component } from "react";
import { connect } from 'react-redux';
import { clickArrow, arrangeGroup, changeGroup } from '../../js/actions/index';
import "./primary.css";

class Primary extends Component {
    constructor(prop) {
        super(prop);
    }

    componentDidMount() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && window.innerWidth < 450) {
            document.getElementById("primary-container").style.webkitBackgroundSize = "100% 50%";
        }

        if (!this.props.clicked) {
            this.props.arrangeGroup({
                selectedGroup: this.props.allGroup[0],
                nthGroup: 0,
                selectedTitle: this.props.title[0]
            })
        }
    }

    previousList = () => {
        document.getElementById("champImg").style.opacity = "0";
        document.getElementById("border-img").style.opacity = "0";
        let index = this.props.nthGroup === 0 ? this.props.allGroup.length - 1 : this.props.nthGroup - 1;
        this.props.changeGroup({
            selectedGroup: this.props.allGroup[index],
            nthGroup: index,
            selectedTitle: this.props.title[index],
        })
        this.props.clickArrow();
    }

    nextList = () => {
        document.getElementById("champImg").style.opacity = "0";
        document.getElementById("border-img").style.opacity = "0";
        let index = this.props.nthGroup === this.props.allGroup.length - 1 ? 0 : this.props.nthGroup + 1;
        this.props.changeGroup({
            selectedGroup: this.props.allGroup[index],
            nthGroup: index,
            selectedTitle: this.props.title[index],
        })
        this.props.clickArrow();
    }

    render() {
        return (
            <div id="primary-container" className={this.props.nthGroup === 0 ? "one" : this.props.nthGroup === 1 ? "two" : "three"}>
                <h1 id="title" style={{ color: this.props.nthGroup === 1 ? '#ffb800' : "lightblue" }}>{this.props.selectedTitle}</h1>
                <div id="desc-box" className={this.props.clicked ? "display" : "none"}>
                    <div id="desc">
                        <ul className={this.props.className} id="button-container">
                            <li className="button" onClick={e => this.props.showOverview()}>Overview</li>
                            <li className="button" onClick={e => this.props.showSkill()}>Skills</li>
                            <li className="button" onClick={e => this.props.showVideo()}>Video</li>
                        </ul>
                        <div id="opinion-container">
                            <p id="opinion"></p>
                        </div>
                        <div id="skillset">
                            <ul id="skill-img">
                                {this.props.clickedChampSkills}
                                <div id="desc-container">
                                    <div id="skill-desc"></div>
                                </div>
                            </ul>
                        </div>
                        <div id="video-container">
                            <iframe id="video" frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
                <ul className="primary-champ">
                    {this.props.selectedGroup}
                </ul>
                <div id="arrows">
                    <div className="left" onClick={e => { this.previousList() }}></div>
                    <div className="right" onClick={e => { this.nextList() }}></div>
                </div>
                <div id="img-box">
                    <img id="border-img" src={require("../../../public/resource/modi_challenger.png")}></img>
                    <img id="champImg"></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clicked: state.clicked,
        clickedChampSkills: state.clickedChampSkills,
        selectedChamp: state.selectedChamp,
        selectedGroup: state.selectedGroup,
        selectedTitle: state.selectedTitle,
        nthGroup: state.nthGroup,
        allGroup: state.allGroup,
        title: state.title,
        className: state.className
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickArrow: () => dispatch(clickArrow()),
        arrangeGroup: (info) => dispatch(arrangeGroup(info)),
        changeGroup: (info) => dispatch(changeGroup(info))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Primary);