import {MAP} from "../constants/action.constants";

export const updateMap = (params) => {
    return {
        type: "UPDATE_MAP",
        payload: params
    }
};