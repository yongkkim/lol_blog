import { ADD_ARTICLE, SHOW_BAR, NOT_SHOW_BAR } from "../constants/action-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}
export function showBar() {
    return { type: SHOW_BAR };
}
export function closeBar() {
    return { type: NOT_SHOW_BAR };
}
