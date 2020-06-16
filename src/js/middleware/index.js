export function middleWare({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === "DATA_CHAMPS") {
                console.log("middleware", action.payload);
                dispatch({ type: "DATA_ALLCHAMPS", payload: action.payload });
            }
            return next(action);
        }
    }
}
