import moment from "moment";
import {VENUES} from "../constants/config.constants";

const ONE_HUNDRED_KILOMETERS = 100;
const ONE_HUNDRED_THOUSANDS_METERS= 100000;


function getVenues(query, location) {
    const request = getRequestURL(query, location);
    return fetch(VENUES.SERVICE_URL + request)
        .then(response => response.text())
        .then(response=>JSON.parse(response).response.venues);
}

function getRequestURL(query, location) {
    const lat = location.center.lat;
    const lng = location.center.lng;
    const radius = location.radius.value >= ONE_HUNDRED_KILOMETERS ?
        ONE_HUNDRED_THOUSANDS_METERS :
        location.radius.value.toFixed(3) * 100;
    return "?" + [
        "client_id=" + VENUES.CLIENT_ID,
        "client_secret=" + VENUES.SECRET,
        "ll=" + lat + "," + lng,
        "v=" + moment().format("YYYYMMDD"),
        "radius=" + radius,
        "query=" + query
    ].join('&')
}

function getCity(location){
    return location.city ? location.city : " - ";
}

function getAddress(location){
    return location.address ? location.address : " - "
}

const VenuesService = {
    getVenues,
    getCity,
    getAddress
};

export default VenuesService;