import store from "../js/store/index";
import { addArticle, showBar, closeBar } from "../js/actions/index";

window.store = store;
window.addArticle = addArticle;
window.showBar = showBar;
window.closeBar = closeBar;