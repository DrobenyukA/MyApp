import {USER, MAP} from "../constants/action.constants";
import {MAPBOX} from "../constants/config.constants";

const defaultState = {
    center: MAPBOX.CENTER
};

const mapReducer = (state = defaultState, action) => {
    switch(action.type){
        case MAP.UPDATE_MAP: return {
            ...state,
            center: action.payload.center,
            radius: action.payload.radius
        };
        case USER.LOGOUT: return defaultState;
        default: return state;
    }
};

export default mapReducer;