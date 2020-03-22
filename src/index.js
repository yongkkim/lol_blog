import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import Home from "./App.js";
import index from "./js/index"
render(
    <Provider store={store}><Home /></Provider>, document.getElementById("root")
);