import { SHOW_BAR, NOT_SHOW_BAR, CLICK_ARROW, OPEN_MENU, ARRANGE_GROUP, CHANGE_GROUP, GATHER_INFO } from "../constants/action-types";

const initialState = {
    bar: false,
    clicked: false,
    clickedChampSkills: "",
    selectedChamp: "",
    selectedTitle: "",
    selectedGroup: [],
    nthGroup: 0,
    allGroup: [],
    title: [],
    skills: {},
    grouping: false,

};

const rootReducer = (state = initialState, action) => {

    if (action.type === SHOW_BAR) {
        return {
            ...state,
            bar: true
        };
    }
    if (action.type === NOT_SHOW_BAR) {
        return {
            ...state,
            bar: false
        };
    }
    if (action.type === CLICK_ARROW) {
        return {
            ...state,
            clicked: false
        };
    }
    if (action.type === OPEN_MENU) {
        return {
            ...state,
            clicked: action.info.clicked,
            clickedChampSkills: action.info.clickedChampSkills,
            selectedChamp: action.info.selectedChamp
        };
    }
    if (action.type === GATHER_INFO) {
        return {
            ...state,
            allGroup: action.info.allGroup,
            title: action.info.title,
            skills: action.info.skills,
            grouping: action.info.grouping
        };
    }
    if (action.type === ARRANGE_GROUP) {
        return {
            ...state,
            selectedGroup: action.info.selectedGroup,
            nthGroup: action.info.nthGroup,
            selectedTitle: action.info.selectedTitle
        };
    }
    if (action.type === CHANGE_GROUP) {
        return {
            ...state,
            selectedTitle: action.info.selectedTitle,
            selectedGroup: action.info.selectedGroup,
            nthGroup: action.info.nthGroup
        };
    }


    return state;
}

export default rootReducer;