import React, { Component } from "react";
import "./secondary.css";
import axios from 'axios';
import champDesc from "../champDesc/champDesc";

class Secondary extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            clicked: false,
            skills: {},
            clickedChampSkills: "",
            selectedChamp: ""
        }
    }

    componentWillMount() {
        Object.keys(champDesc.secondary).forEach(name => {
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

    componentWillReceiveProps(newProps) {
        if (this.props.images.length !== newProps.images.length) {
            let allLi = document.getElementsByClassName("circle");

            Object.keys(newProps.images).forEach((num, i) => {
                let image = document.createElement("img");
                image.key = i + "_s_img";
                image.src = newProps.images[num].url;

                let text_box = document.createElement("div");
                text_box.key = i + "_s_text";
                text_box.className = "ptext";
                text_box.onmouseenter = e => this.showName(e);
                text_box.onmouseleave = e => this.hideName(e);
                text_box.onclick = e => this.showDesc(newProps.images[num].name)

                let text = document.createElement("p");
                text.innerHTML = newProps.images[num].name;
                text_box.appendChild(text);

                allLi[i].appendChild(image);
                allLi[i].appendChild(text_box);
            })
        }
    }

    showDesc = (name) => {
        if (event.target.parentNode.parentNode.id === "skill-img-sc") {
            this.showSkillDesc(event, "");
        } else if (this.state.selectedChamp !== "") {
            this.showOpinion();
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

        document.getElementById("desc-sc").innerHTML = champDesc.secondary[name].desc;
        let circle = document.getElementsByClassName("circle-bg");
        circle[0].src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + name + "_0.jpg";
        circle[0].style.zIndex = "8";
        circle[0].style.opacity = "0.8";

        circle[1].style.backgroundColor = "black";
        circle[1].style.opacity = "1";
        circle[1].style.zIndex = "7"

        for (let i = 0; i < circle.length; i++) {
            circle[i].style.height = "55%";
            circle[i].style.borderRadius = "50%";
            circle[i].style.top = "25%";
            circle[i].style.width = "37%";
        }

        document.getElementById("video-sc").src = champDesc.secondary[name].video;

        this.setState({
            clicked: true,
            selectedChamp: name,
            clickedChampSkills: passiveAndSkills
        })
    }

    showName = (e) => {
        e.target.style.backgroundColor = "rgb(0,0,0,0.5)";
        e.target.firstChild.style.display = "block";
    }

    hideName = (e) => {
        e.target.style.backgroundColor = "unset";
        e.target.firstChild.style.display = "none";
    }

    showSkill = () => {
        document.getElementById("skillset-sc").style.display = "block";
        document.getElementById("skill-img-sc").style.display = "block";
        document.getElementById("skill-img-sc").firstChild.firstChild.click();
        document.getElementById("desc-sc").style.display = "none";
        document.getElementById("video-sc").style.display = "none";
    }

    showOpinion = () => {
        document.getElementById("desc-sc").style.display = "block";
        document.getElementById("skillset-sc").style.display = "none";
        document.getElementById("video-sc").style.display = "none";
    }

    showVideo = () => {
        document.getElementById("video-sc").style.display = "block";
        document.getElementById("desc-sc").style.display = "none";
        document.getElementById("skillset-sc").style.display = "block";
        document.getElementById("skill-img-sc").style.display = "none";
    }

    showSkillDesc = (e, desc) => {
        document.getElementById("skill-desc-sc").innerHTML = desc;
        let allLi = e.target.parentNode.parentNode.getElementsByTagName("img");
        for (let i = 0; i < allLi.length; i++) {
            allLi[i].style.transform = "unset";
            allLi[i].style.borderBottom = "unset"
        }
        e.target.style.transform = "scale(1.3)";
        e.target.style.borderBottom = "3px solid whitesmoke";
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="circle-container">
                <div id="title-ft"><h1>My Second Best Champions</h1></div>
                <ul className="secondary-champ">
                    <li className="circle"></li>
                    <li className="two-circles">
                        <ul className="secondary-champ middle">
                            <li className="circle"></li>
                            <li className="circle"></li>
                        </ul>
                    </li>
                    <li className="two-circles">
                        <ul className="secondary-champ middle">
                            <li className="circle"></li>
                            <li className="circle"></li>
                        </ul>
                    </li>
                    <li className="circle"></li>
                </ul>

                <div id="desc-circle">
                    {this.state.clicked && <div id="button-sc-container">
                        <div className="button preference" onClick={e => this.showOpinion()}>Opinion</div>
                        <div className="button skill" onClick={e => this.showSkill()}>Skillset</div>
                        <div className="button video" onClick={e => this.showVideo()} >Best Plays</div>
                    </div>}
                    <div id="champ-desc-container-sc">
                        <div id="desc-sc"></div>
                    </div>
                    <div id="skillset-sc">
                        <ul id="skill-img-sc">
                            {this.state.clickedChampSkills}
                            <div id="skill-desc-container-sc">
                                <div id="skill-desc-sc"></div>
                                {/* <div id="appearLeftRight"></div> */}
                            </div>
                        </ul>
                        <iframe id="video-sc" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                <img className="circle-bg" src={require("../../../public/resource/ccc.png")}></img>
                <div className="circle-bg"></div>

            </div>
        );
    }
}

export default Secondary;