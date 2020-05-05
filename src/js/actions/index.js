import { SHOW_BAR, NOT_SHOW_BAR, CLICK_ARROW, OPEN_MENU, ARRANGE_GROUP, CHANGE_GROUP, GATHER_INFO, GATHER_SKILLS } from "../constants/action-types";

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