import React, { Component } from "react";
import axios from 'axios';
import "./primary.css";
import champDesc from "../champDesc/champDesc";

class Primary extends Component {
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
        e.target.style.backgroundColor = "rgba(0,0,0,0.5)";
        e.target.firstChild.style.display = "block";
    }

    componentWillMount() {
        Object.keys(champDesc.primary).forEach(name => {

            let newName;
            if (name !== "LeBlanc") {
                newName = name;
            } else {
                newName = "Leblanc";
            }
            axios.get("http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion/" + newName + ".json")
                .then(response => {
                    let skillset = {
                        [name]: response.data.data[newName]
                    }
                    let champSkill = Object.assign(skillset, this.state.skills);

                    this.setState({ skills: champSkill });
                });
        })
    }

    componentDidMount() {
        if (!this.state.clicked) {
            document.getElementById("champImg").style.display = "none";
        }
    }

    showDesc = (name) => {
        if (event.target.parentNode.parentNode.id === "skill-img") {
            this.showSkillDesc(event, "");
        } else if (this.state.selectedChamp !== "") {
            this.showOpinion();
        }

        let url;
        if (name !== "LeBlanc") {
            url = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + name + "_0.jpg";
        } else {
            url = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Leblanc_0.jpg";
        }
        let passiveAndSkills = this.state.skills[name].spells.map((skill, i) => {
            return (
                <li key={name + "-skill" + i} id={skill.id}>
                    <img onClick={e => this.showSkillDesc(e, skill.description)}
                        src={"http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/" + skill.image.full}></img>
                </li>
            )
        })

        passiveAndSkills.push(<li key={name + "-passive"} id={this.state.skills[name].passive.name}>
            <img onClick={e => this.showSkillDesc(e, this.state.skills[name].passive.description)}
                src={"http://ddragon.leagueoflegends.com/cdn/9.18.1/img/passive/" + this.state.skills[name].passive.image.full}></img>
        </li>);

        document.getElementById("desc").getElementsByTagName("p")[0].innerHTML = champDesc.primary[name].desc;
        document.getElementById("champImg").style.display = "block";
        document.getElementById("champImg").src = url;
        document.getElementById("video").src = champDesc.primary[name].video;

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
        document.getElementById("desc").getElementsByTagName("p")[0].style.display = "none";
        document.getElementById("skillset").style.display = "block";
        document.getElementById("skill-img").firstChild.firstChild.click();
    }

    showOpinion = () => {
        document.getElementById("desc").getElementsByTagName("p")[0].style.display = "block";
        document.getElementById("skillset").style.display = "none";
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
        // console.log(champDesc);
        // console.log(this.state.skills);
        let champs = [];

        Object.keys(this.props.images).map((num, i) => {
            champs.push(
                <li key={i}>
                    <img key={i + "_img"} src={this.props.images[num].url} />
                    <div key={i + "_text"} className="ptext" id={"ptext" + i}
                        onMouseEnter={e => this.showName(e)} onMouseLeave={e => this.hideName(e)} onClick={e => this.showDesc(this.props.images[num].name)}>
                        <p>{this.props.images[num].name}</p>
                    </div>
                </li>);
        })

        return (
            <div id="primary-container">
                <h1>My Best Champions</h1>
                <div id="desc-box">
                    <div id="desc">
                        {this.state.clicked && <div id="button-container">
                            <div className="button preference" onClick={e => this.showOpinion()}>Opinion</div>
                            <div className="button skill" onClick={e => this.showSkill()}>Skillset</div>
                        </div>}
                        <p></p>
                        <div id="skillset">
                            <ul id="skill-img">
                                {this.state.clickedChampSkills}
                                <div id="desc-container">
                                    <div id="skill-desc"></div>
                                    {/* <div id="appearLeftRight"></div> */}
                                </div>
                            </ul>
                            <div id="video-container">
                                <p id="video-title">Best Plays</p>
                                <iframe id="video" frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                    <img id="border-desc" src={require("../../../public/resource/modi_challenger.png")}></img>
                </div>
                <ul className="primary-champ">
                    {champs}
                </ul>
                <div id="img-box">
                    <img id="border-img" src={require("../../../public/resource/modi_challenger.png")}></img>
                    <img id="champImg"></img>
                </div>
            </div>
        );
    }
}

export default Primary;