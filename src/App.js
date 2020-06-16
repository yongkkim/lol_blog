import React, { Component, useState } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Patch from "./components/patch/patch.js";
import Primary from "./components/primary/primary.js";
import { desc, mostPlayedChamp, patchChamp } from "./components/champDesc/champDesc"
import Contact from "./components/contact/contact.js";
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { showBar, closeBar, gatherInfo, openMenu, changeBorder, groupChamp } from './js/actions/index';


class App extends Component {
    constructor(prop) {
        super(prop);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        let allGroup = [];

        Object.keys(desc).forEach(group => {
            let champsURL = [];
            let champs = [];
            Object.keys(desc[group]).forEach(name => {
                let newName = name === "Kai'Sa" ? "Kaisa" : name === "LeBlanc" ? "Leblanc" : name;
                champsURL.push({
                    url: "https://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/" + newName + ".png",
                    name: newName
                });

                champs = Object.keys(champsURL).map((num, i) => {
                    return <li key={i}>
                        <img key={i + "_img"} src={champsURL[num].url} />
                        <div key={i + "_text"} className="ptext" id={"ptext" + i}
                            onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => { this.showDesc(champsURL[num].name, group) }}>
                            <p>{champsURL[num].name}</p>
                        </div>
                    </li>;
                })
            })
            allGroup.push(champs);
        })

        this.props.groupChamp();

        this.props.gatherInfo({
            allGroup: allGroup,
            title: ["My 1st Tier Champions", "My 2nd Tier Champions", "Champions I'll Play"],
            grouping: true
        })
    }

    handleScroll = () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            - document.getElementById("main").offsetHeight;

        if (winScroll > document.getElementById("main").offsetHeight - 200) {
            this.props.showBar();
            let scrolled = ((winScroll - document.getElementById("main").offsetHeight) / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        } else {
            this.props.closeBar();
        }
    }


    showName = (e) => {
        e.target.style.backgroundColor = "rgba(0,0,0,0.5)";
        e.target.firstChild.style.display = "block";
    }

    showOverview = () => {
        document.getElementById("opinion").style.display = "block";
        document.getElementById("skillset").style.display = "none";
        document.getElementById("video-container").style.display = "none";
        this.props.changeBorder("overview");
    }

    showSkill = () => {
        document.getElementById("opinion").style.display = "none";
        document.getElementById("skillset").style.display = "block";
        document.getElementById("video-container").style.display = "none";
        document.getElementById("skill-img").firstChild.firstChild.click();
        this.props.changeBorder("skill");
    }

    showVideo = () => {
        document.getElementById("opinion").style.display = "none";
        document.getElementById("skillset").style.display = "none";
        document.getElementById("video-container").style.display = "block";
        document.getElementById("skill-img").firstChild.firstChild.click();
        this.props.changeBorder("video");
    }

    showDesc = (name, group) => {
        this.showOverview();

        let newName = name !== "LeBlanc" && name !== "Kai'Sa" ? name : name === "Kai'Sa" ? "Kaisa" : "Leblanc";

        let url = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + newName + "_0.jpg";

        let passiveAndSkills = this.props.groupChampInfo[newName].spells.map((skill, i) => {
            return (
                <li key={newName + "-skill" + i} id={skill.id}>
                    <img onClick={e => this.showSkillDesc(e, skill.description)}
                        src={"https://ddragon.leagueoflegends.com/cdn/10.8.1/img/spell/" + skill.image.full}></img>
                </li>
            )
        })

        passiveAndSkills.push(<li key={newName + "-passive"} id={this.props.groupChampInfo[newName].passive.name}>
            <img onClick={e => this.showSkillDesc(e, this.props.groupChampInfo[newName].passive.description)}
                src={"https://ddragon.leagueoflegends.com/cdn/10.8.1/img/passive/" + this.props.groupChampInfo[newName].passive.image.full}></img>
        </li>);

        document.getElementById("opinion").innerHTML = desc[group][newName].desc;
        document.getElementById("champImg").style.opacity = "1";
        document.getElementById("border-img").style.opacity = "1";
        document.getElementById("champImg").src = url;
        document.getElementById("video").src = desc[group][newName].video;

        this.props.openMenu({
            clicked: true,
            selectedChamp: name,
            clickedChampSkills: passiveAndSkills
        })
    }

    hideName = (e) => {
        e.target.style.backgroundColor = "unset";
        e.target.firstChild.style.display = "none";
    }

    showSkillDesc = (e, desc) => {
        document.getElementById("skill-desc").innerHTML = desc;
        let allLi = e.target.parentNode.parentNode.getElementsByTagName("img");
        for (let i = 0; i < allLi.length; i++) {
            allLi[i].style.transform = "unset";
            allLi[i].style.borderBottom = "unset"
        }
        e.target.style.transform = "scale(1.1)";
        e.target.style.borderBottom = "3px solid whitesmoke";

    }

    render() {
        if (this.props.grouping) {
            return (
                <ul className="list">
                    <CSSTransition
                        in={this.props.bar}
                        timeout={500}
                        classNames="progress"
                        unmountOnExit
                    >
                        <div className="progress-container">
                            <div className="progress-bar" id="myBar"></div>
                        </div>
                    </CSSTransition>
                    <li id="main"><Main /></li>
                    <li id="patch"><Patch /></li>
                    <li id="primary"><Primary showOverview={this.showOverview} showSkill={this.showSkill} showVideo={this.showVideo} /></li>
                    <li id="contact"><Contact /></li>
                </ul>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bar: state.bar,
        clicked: state.clicked,
        grouping: state.grouping,
        skills: state.skills,
        groupChampInfo: state.groupChampInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showBar: () => dispatch(showBar()),
        closeBar: () => dispatch(closeBar()),
        openMenu: (info) => dispatch(openMenu(info)),
        gatherInfo: (info) => dispatch(gatherInfo(info)),
        changeBorder: (className) => dispatch(changeBorder(className)),
        groupChamp: () => dispatch(groupChamp())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);