import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./App.js";
import index from "./js/index"
// if you're in create-react-app import the files as:
// import store from "./js/store/index";
// import App from "./js/components/App.jsx";
render(
    <Provider store={store}><App /></Provider>, document.getElementById("root")
);