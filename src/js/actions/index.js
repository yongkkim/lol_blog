import { SHOW_BAR, NOT_SHOW_BAR, CLICK_ARROW, OPEN_MENU, ARRANGE_GROUP, CHANGE_GROUP, GATHER_INFO, GATHER_SKILLS, SET_CLASSNAME } from "../constants/action-types";
import axios from 'axios';
import { desc } from "../../components/champDesc/champDesc"

export function showBar() {
    return { type: SHOW_BAR };
}
export function closeBar() {
    return { type: NOT_SHOW_BAR };
}
export function clickArrow() {
    return { type: CLICK_ARROW };
}
export function openMenu(info) {
    return { type: OPEN_MENU, info };
}
export function gatherSkills(info) {
    return { type: GATHER_SKILLS, info };
}
export function gatherInfo(info) {
    return { type: GATHER_INFO, info };
}
export function arrangeGroup(info) {
    return { type: ARRANGE_GROUP, info };
}
export function changeGroup(info) {
    return { type: CHANGE_GROUP, info };
}
export function changeBorder(className) {
    return { type: SET_CLASSNAME, className }
}

export function groupChamp() {
    let selected = [];
    Object.keys(desc).forEach(group => {
        Object.keys(desc[group]).forEach(name => {
            let newName = name === "Kai'Sa" ? "Kaisa" : name === "LeBlanc" ? "Leblanc" : name;
            selected.push(axios.get("http://ddragon.leagueoflegends.com/cdn/10.10.3216176/data/en_US/champion/" + newName + ".json"));
        })
    })
    return (dispatch) => {
        let onlyData = {};
        Promise.all(selected).then(axios.spread((...responses) => {
            responses.forEach(res => { onlyData = Object.assign(onlyData, res.data.data) })
            dispatch({ type: "DATA_GROUP_CHAMPS", payload: Object.assign({}, onlyData) });
        }))
    }
}