import React, { Component } from "react";
import "./future.css";
import axios from 'axios';
import champDesc from "../champDesc/champDesc";

class Future extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            clicked: false,
            skills: {},
            clickedChampSkills: "",
            selectedChamp: ""
        }
    }

    showName = (e) => {
        e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        e.target.firstChild.style.display = "block";
    }

    componentWillMount() {
        Object.keys(champDesc.future).forEach(name => {
            axios.get("http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion/" + name + ".json")
                .then(response => {
                    let skillset = {
                        [name]: response.data.data[name]
                    }
                    let champSkill = Object.assign(skillset, this.state.skills);

                    this.setState({ skills: champSkill });
                });
        })
    }

    componentDidMount() {
        if (!this.state.clicked) {
            document.getElementById("champImg-ft").style.display = "none";
        }
    }

    showDesc = (name) => {
        if (event.target.parentNode.parentNode.id === "skill-img-ft") {
            this.showSkillDesc(event, "");
        } else if (this.state.selectedChamp !== "") {
            this.showOpinion();
        }

        let newName = name === "Kai'Sa" ? "Kaisa" : name;
        let passiveAndSkills = this.state.skills[newName].spells.map((skill, i) => {
            return (
                <li key={newName + "-skill" + i} id={skill.id}>
                    <img onClick={e => this.showSkillDesc(e, skill.description)}
                        src={"http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/" + skill.image.full}></img>
                </li>
            )
        })

        passiveAndSkills.push(<li key={newName + "-passive"} id={this.state.skills[newName].passive.name}>
            <img onClick={e => this.showSkillDesc(e, this.state.skills[newName].passive.description)}
                src={"http://ddragon.leagueoflegends.com/cdn/9.18.1/img/passive/" + this.state.skills[newName].passive.image.full}></img>
        </li>);

        document.getElementById("desc-ft").getElementsByTagName("p")[0].innerHTML = champDesc.future[newName].desc;
        document.getElementById("champImg-ft").style.display = "block";
        document.getElementById("champImg-ft").src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + newName + "_0.jpg";
        document.getElementById("video-ft").src = champDesc.future[newName].video;

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

    showSkill = () => {
        document.getElementById("desc-ft").getElementsByTagName("p")[0].style.display = "none";
        document.getElementById("skillset-ft").style.display = "block";
        document.getElementById("skill-img-ft").firstChild.firstChild.click();
    }

    showOpinion = () => {
        document.getElementById("desc-ft").getElementsByTagName("p")[0].style.display = "block";
        document.getElementById("skillset-ft").style.display = "none";
    }

    showSkillDesc = (e, desc) => {
        document.getElementById("skill-desc-ft").innerHTML = desc;
        let allLi = e.target.parentNode.parentNode.getElementsByTagName("img");
        for (let i = 0; i < allLi.length; i++) {
            allLi[i].style.transform = "unset";
            allLi[i].style.borderBottom = "unset"
        }
        e.target.style.transform = "scale(1.1)";
        e.target.style.borderBottom = "3px solid whitesmoke";
    }

    render() {
        // console.log(this.props.images);
        let champs = [];

        Object.keys(this.props.images).map((num, i) => {
            champs.push(
                <li key={i}>
                    <img key={i + "_img_ft"} src={this.props.images[num].url} />
                    <div key={i + "_text_ft"} className="ptext-ft" id={"ptext-ft" + i}
                        onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => this.showDesc(this.props.images[num].name)}>
                        <p>{this.props.images[num].name}</p>
                    </div>
                </li>);
        })

        return (
            <div id="future-container">
                <h1>Champions that I want to play</h1>
                <div id="desc-box">
                    <div id="desc-ft">
                        {this.state.clicked && <div id="button-container">
                            <div className="button preference" onClick={e => this.showOpinion()}>Opinion</div>
                            <div className="button skill" onClick={e => this.showSkill()}>Skillset</div>
                        </div>}
                        <p></p>
                        <div id="skillset-ft">
                            <ul id="skill-img-ft">
                                {this.state.clickedChampSkills}
                                <div id="desc-container">
                                    <div id="skill-desc-ft"></div>
                                    {/* <div id="appearLeftRight"></div> */}
                                </div>
                            </ul>
                            <div id="video-container">
                                <p id="video-title">Best Plays</p>
                                <iframe id="video-ft" frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                    <img id="border-desc" src={require("../../../public/resource/modi_challenger.png")}></img>
                </div>
                <ul className="primary-champ-ft">
                    {champs}
                </ul>
                <div id="img-box">
                    <img id="border-img" src={require("../../../public/resource/modi_challenger.png")}></img>
                    <img id="champImg-ft"></img>
                </div>
            </div>
        );
    }
}

export default Future;