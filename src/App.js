import React, { Component, useState } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Primary from "./components/primary/primary.js";
import { desc, mostPlayedChamp } from "./components/champDesc/champDesc"
import Contact from "./components/contact/contact.js";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { connect } from 'react-redux';
import { showBar, closeBar, gatherInfo, openMenu } from './js/actions/index';


class App extends Component {
    constructor(prop) {
        super(prop);
    }

    componentDidMount() {
        let allChampSkills = {};
        Object.keys(desc).forEach(name => {

            let newName = name !== "LeBlanc" && name !== "Kai'Sa" ? name : name === "Kai'Sa" ? "Kaisa" : "Leblanc";

            axios.get("https://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion/" + newName + ".json")
                .then(response => {
                    allChampSkills[name] = response.data.data[newName];
                });
        })

        let images = [];
        let allGroup = [];
        let keys;
        window.addEventListener('scroll', this.handleScroll);
        axios.get("https://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json")
            .then(response => images = response.data.data)
            .then(() => {
                keys = Object.keys(images);
                let threeGroup = [
                    ["Lux", "Leblanc", "Blitzcrank", "Orianna", "Ahri", "Thresh"],
                    ["Syndra", "Rumble", "Kennen", "Ezreal", "Karma", "Gragas"],
                    ["Qiyana", "Sylas", "Pyke", "Kaisa", "Vayne", "Akali"]
                ]


                for (let group of threeGroup) {
                    let champsURL = [];
                    let champs = [];
                    for (let champ of group) {
                        if (keys.indexOf(champ) > -1) {
                            champsURL.push({
                                url: "https://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/" + images[champ].image.full,
                                name: images[champ].name
                            });
                        }
                    }
                    champs = Object.keys(champsURL).map((num, i) => {
                        return <li key={i}>
                            <img key={i + "_img"} src={champsURL[num].url} />
                            <div key={i + "_text"} className="ptext" id={"ptext" + i}
                                onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => { this.showDesc(champsURL[num].name) }}>
                                <p>{champsURL[num].name}</p>
                            </div>
                        </li>;
                    })
                    allGroup.push(champs);
                }

            }).then(() =>
                this.props.gatherInfo({
                    allGroup: allGroup,
                    title: ["My 1st Tier Champions", "My 2nd Tier Champions", "Champions I'll Play"],
                    skills: allChampSkills,
                    grouping: true
                }))

        //each lane top picks
        // Object.keys(mostPlayedChamp).forEach(name => {
        //     let laneChamps = [];
        //     mostPlayedChamp[name].forEach(ch => {
        //         axios.get("https://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion/" + ch + ".json")
        //         .then(response => {
        //             laneChamps.push(response.data.data[ch]);
        //         });
        //     })
        // })


    }

    //new versionw with redux
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

    showOpinion = () => {
        document.getElementById("opinion").style.display = "block";
        document.getElementById("skillset").style.display = "none";
    }

    showSkill = () => {
        document.getElementById("opinion").style.display = "none";
        document.getElementById("skillset").style.display = "block";
        document.getElementById("skill-img").firstChild.firstChild.click();
    }

    showDesc = (name) => {
        if (this.props.clicked) {
            this.showOpinion();
        }

        let nameForUrl = name !== "LeBlanc" && name !== "Kai'Sa" ? name : name === "Kai'Sa" ? "Kaisa" : "Leblanc";

        let newName = name !== "Kai'Sa" ? name : "Kaisa";

        let url = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + nameForUrl + "_0.jpg";

        let passiveAndSkills = this.props.skills[newName].spells.map((skill, i) => {
            return (
                <li key={newName + "-skill" + i} id={skill.id}>
                    <img onClick={e => this.showSkillDesc(e, skill.description)}
                        src={"https://ddragon.leagueoflegends.com/cdn/10.8.1/img/spell/" + skill.image.full}></img>
                </li>
            )
        })

        passiveAndSkills.push(<li key={newName + "-passive"} id={this.props.skills[newName].passive.name}>
            <img onClick={e => this.showSkillDesc(e, this.props.skills[newName].passive.description)}
                src={"https://ddragon.leagueoflegends.com/cdn/10.8.1/img/passive/" + this.props.skills[newName].passive.image.full}></img>
        </li>);

        document.getElementById("opinion").innerHTML = champDesc[newName].desc;
        document.getElementById("champImg").style.opacity = "1";
        document.getElementById("champImg").src = url;
        document.getElementById("video").src = champDesc[newName].video;

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
                    <li id="primary"><Primary showOpinion={this.showOpinion} showSkill={this.showSkill} /></li>
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
        skills: state.skills
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showBar: () => dispatch(showBar()),
        closeBar: () => dispatch(closeBar()),
        openMenu: (info) => dispatch(openMenu(info)),
        gatherInfo: (info) => dispatch(gatherInfo(info))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);