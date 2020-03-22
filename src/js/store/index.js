import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { handleScroll } from "../middleware";
//with middleware
// const store = createStore(rootReducer, applyMiddleware(handleScroll));
const store = createStore(rootReducer);
export default store;