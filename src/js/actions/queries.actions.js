import {QUERIES} from "../constants/action.constants";

export const addQuery = query => {
    return {
        type: QUERIES.ADD,
        payload: query
    }
};

export const deleteQuery = time => {
    return {
        type: QUERIES.DELETE,
        payload: time
    }
};