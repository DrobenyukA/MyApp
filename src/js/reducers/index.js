import {combineReducers} from "redux";

import user from "./user.reducer";
import venues from "./venues.reducer";
import map from "./map.reducer";
import queries from "./queries.reducer";

const appReducer = combineReducers({
    user,
    venues,
    map,
    queries
});

export default appReducer;