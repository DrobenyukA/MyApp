import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import appReducer from "./reducers";

const middleware = [thunk];

const store = createStore(
    appReducer,
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

export default store;