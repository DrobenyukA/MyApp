import {VENUES} from "../constants/action.constants";

export const storeVenues = venues => {
    return {
        type: VENUES.STORE,
        payload: venues
    }
};