import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import user from "./reducers/user.reducer";
import venues from "./reducers/venues.reducer";
import map from "./reducers/map.reducer";

const middleware = [thunk];

const store = createStore(
    combineReducers({
        user,
        venues,
        map
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

export default store;