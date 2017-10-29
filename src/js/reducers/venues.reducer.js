import {VENUES} from "../constants/action.constants";

const venuesReducer = (state = [], action) => {
    switch (action.type) {
        case VENUES.STORE: return action.payload;
        case "LOGOUT":
            return [];
        default:
            return state;
    }
};

export default venuesReducer;