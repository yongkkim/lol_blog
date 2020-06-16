import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { middleWare } from "../middleware";
import thunk from "redux-thunk";
//with middleware

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, storeEnhancers(applyMiddleware(middleWare, thunk)));
const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(rootReducer);
export default store;