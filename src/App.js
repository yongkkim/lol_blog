import React, { Component, useState } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Primary from "./components/primary/primary.js";
import champDesc from "./components/champDesc/champDesc"
import Contact from "./components/contact/contact.js";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { connect } from 'react-redux';
import { showBar } from './js/actions/index';


class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            // bar: false,
            images: [],
            allGroup: [],
            title: [],
            grouping: false,
            clicked: false,
            clickedChampSkills: "",
            selectedChamp: "",
            skills: {}
        }
    }

    componentDidMount() {
        let allChampSkills = {};
        let threeTitle = [];
        Object.keys(champDesc).forEach(name => {

            let newName;
            if (name !== "LeBlanc" && name !== "Kai'Sa") {
                newName = name;
            } else {
                newName = name === "Kai'Sa" ? "Kaisa" : "Leblanc";
            }
            axios.get("https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion/" + newName + ".json")
                .then(response => {
                    allChampSkills[name] = response.data.data[newName];
                });
        })
        this.setState({ skills: allChampSkills });

        let images = [];
        let pChamps = [];
        let sChamps = [];
        let fChamps = [];
        let allGroup = [];
        window.addEventListener('scroll', this.handleScroll);
        // window.addEventListener('scroll', this.props.showBar());

        axios.get("https://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json")
            .then(response => {
                images = response.data.data;
                let pImageURL = [];
                let sImageURL = [];
                let fImageURL = [];
                let primary = ["Lux", "Leblanc", "Blitzcrank", "Orianna", "Ahri", "Thresh"];
                let secondary = ["Syndra", "Rumble", "Kennen", "Ezreal", "Karma", "Gragas"];
                let future = ["Qiyana", "Sylas", "Pyke", "Kaisa", "Vayne", "Akali"];
                let keys = Object.keys(images);


                primary.forEach(p => {
                    if (keys.indexOf(p) > -1) {
                        pImageURL.push({
                            url: "https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + images[p].image.full,
                            name: images[p].name
                        });
                    }
                })

                Object.keys(pImageURL).map((num, i) => {
                    pChamps.push(
                        <li key={i}>
                            <img key={i + "_img"} src={pImageURL[num].url} />
                            <div key={i + "_text"} className="ptext" id={"ptext" + i}
                                onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => this.showDesc(pImageURL[num].name)}>
                                <p>{pImageURL[num].name}</p>
                            </div>
                        </li>);
                })

                allGroup.push(pChamps);

                secondary.forEach(s => {
                    if (keys.indexOf(s) > -1) {
                        sImageURL.push({
                            url: "https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + images[s].image.full,
                            name: images[s].name
                        });
                    }
                })

                Object.keys(sImageURL).map((num, i) => {
                    sChamps.push(
                        <li key={i}>
                            <img key={i + "_img"} src={sImageURL[num].url} />
                            <div key={i + "_text"} className="ptext" id={"ptext" + i}
                                onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => this.showDesc(sImageURL[num].name)}>
                                <p>{sImageURL[num].name}</p>
                            </div>
                        </li>);
                })

                allGroup.push(sChamps);

                future.forEach(f => {
                    if (keys.indexOf(f) > -1) {
                        fImageURL.push({
                            url: "https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + images[f].image.full,
                            name: images[f].name
                        });
                    }
                })

                Object.keys(fImageURL).map((num, i) => {
                    fChamps.push(
                        <li key={i}>
                            <img key={i + "_img"} src={fImageURL[num].url} />
                            <div key={i + "_text"} className="ptext" id={"ptext" + i}
                                onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => this.showDesc(fImageURL[num].name)}>
                                <p>{fImageURL[num].name}</p>
                            </div>
                        </li>);
                })

                allGroup.push(fChamps);

                threeTitle.push("My 1st Tier Champions");
                threeTitle.push("My 2nd Tier Champions");
                threeTitle.push("Champions I'll Play");
            }).then(() =>
                this.setState({
                    allGroup: allGroup,
                    title: threeTitle,
                    grouping: true
                }));

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
        if (this.state.clicked) {
            this.showOpinion();
        }

        let nameForUrl;
        if (name !== "LeBlanc" && name !== "Kai'Sa") {
            nameForUrl = name;
        } else {
            nameForUrl = name === "Kai'Sa" ? "Kaisa" : "Leblanc";
        }

        let newName;
        if (name !== "Kai'Sa") {
            newName = name;
        } else {
            newName = "Kaisa"
        }

        let url = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + nameForUrl + "_0.jpg";

        let passiveAndSkills = this.state.skills[newName].spells.map((skill, i) => {
            return (
                <li key={newName + "-skill" + i} id={skill.id}>
                    <img onClick={e => this.showSkillDesc(e, skill.description)}
                        src={"https://ddragon.leagueoflegends.com/cdn/9.22.1/img/spell/" + skill.image.full}></img>
                </li>
            )
        })

        passiveAndSkills.push(<li key={newName + "-passive"} id={this.state.skills[newName].passive.name}>
            <img onClick={e => this.showSkillDesc(e, this.state.skills[newName].passive.description)}
                src={"https://ddragon.leagueoflegends.com/cdn/9.22.1/img/passive/" + this.state.skills[newName].passive.image.full}></img>
        </li>);

        document.getElementById("opinion").innerHTML = champDesc[newName].desc;
        // document.getElementById("champImg").style.display = "block";
        document.getElementById("champImg").style.opacity = "1";
        document.getElementById("champImg").src = url;
        document.getElementById("video").src = champDesc[newName].video;

        this.setState({
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

    clickedStatus = () => {
        this.setState({
            clicked: false
        })
    }


    render() {
        console.log("props = " + this.props.bar);
        if (this.state.grouping) {
            return (
                <ul className="list">
                    <CSSTransition
                        // in={this.state.bar}
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
                    <li id="primary"><Primary allChamps={this.state.allGroup} clicked={this.state.clicked}
                        clickedChampSkills={this.state.clickedChampSkills} selectedChamp={this.state.selectedChamp}
                        showOpinion={this.showOpinion} showSkill={this.showSkill} title={this.state.title}
                        clickedStatus={this.clickedStatus} /></li>
                    <li id="contact"><Contact /></li>
                </ul>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return { bar: state.bar };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showBar: () => dispatch(showBar()),
        closeBar: () => dispatch(closeBar())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);