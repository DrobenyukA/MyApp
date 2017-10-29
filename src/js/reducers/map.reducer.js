import {USER, MAP} from "../constants/action.constants";
import {MAPBOX} from "../constants/config.constants";

const defaultState = {
    center: MAPBOX.CENTER,
    radius: {
        label: "100.00 kilometers",
        value: 100.00
    }
};

const mapReducer = (state = defaultState, action) => {
    switch(action.type){
        case MAP.UPDATE: return {
            ...state,
            center: action.payload.center,
            radius: action.payload.radius
        };
        case USER.LOGOUT: return defaultState;
        default: return state;
    }
};

export default mapReducer;