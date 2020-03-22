import { SHOW_BAR, NOT_SHOW_BAR } from "../constants/action-types";

const initialState = {
    bar: false
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
    return state;
}

export default rootReducer;