import { SHOW_BAR } from "../constants/action-types";

export function handleScroll({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === SHOW_BAR && document.getElementById("main") !== null) {
                let winScroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
                let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
                    - document.getElementById("main").offsetHeight;
                if (winScroll > document.getElementById("main").offsetHeight - 200) {
                    let scrolled = ((winScroll - document.getElementById("main").offsetHeight) / height) * 100;
                    document.getElementById("myBar").style.width = scrolled + "%";
                } else {
                    dispatch({ type: "NOT_SHOW_BAR" })
                }
            }
            return next(action);
        }
    }
}
