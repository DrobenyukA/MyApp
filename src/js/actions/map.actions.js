import {MAP} from "../constants/action.constants";

export const updateMap = (params) => {
    return {
        type: MAP.UPDATE,
        payload: params
    }
};