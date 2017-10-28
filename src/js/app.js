import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import store from "./store";
import MyApp from "./containers/myApp.container";

const element = document.getElementById("myapp");

render(
    <Provider store={store}>
        <MyApp/>
    </Provider>,
    element
);
