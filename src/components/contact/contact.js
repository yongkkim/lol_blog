import React, { Component } from "react";
import "./contact.css";

class Contact extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            copied: false
        }
    }

    componentDidMount() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && window.innerWidth < 450) {
            document.getElementById("contact-container").style.backgroundAttachment = "unset";
        }
        document.getElementById("profile-pic").src = "https://ddragon.leagueoflegends.com/cdn/9.18.1/img/profileicon/3551.png"
    }

    copyText = (e) => {
        let inp = document.createElement('input');
        e.target.appendChild(inp);
        inp.value = e.target.textContent;
        inp.select();
        document.execCommand('copy');
        inp.remove();
        document.getElementById("copied").style.display = "block";

        this.setState({
            copied: true
        })
    }

    render() {
        return (
            <div id="contact-container">
                <ul id="info-container">
                    <li></li>
                    <li>
                        <div id="title-contact"><h1>Let's Play Together</h1></div>
                        <div id="profile-container">
                            <img id="profile-pic"></img>
                            <div id="username" onClick={e => this.copyText(e)}>dragonsoup2</div>
                            {!this.state.copied && <div id="msg"> Click to copy id above</div>}
                            <div id="copied">Copied <img src={require("../../../public/resource/check.png")} /></div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Contact;