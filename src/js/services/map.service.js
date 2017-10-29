import turf from "turf";

const separator = " ";
const ONE_KILOMETER = 1;
const ONE_HUNDRED_KILOMETERS = 100;

function getDistance(center, border, units){
    const from = turf.point([center.lng, center.lat]);
    const to = turf.point([border.lng, border.lat]);
    const value = turf.distance(from, to, units);
    const radius = value > ONE_HUNDRED_KILOMETERS ? ONE_HUNDRED_KILOMETERS : value;
    return {
        label: getLabel(radius, units),
        value: radius
    };
};

function getLabel(value, units="kilometers"){
    switch(units){
        case "kilometers": return formatKilometersValue(value, units);
        default: return [parseFloat(value).toFixed(2), units].join(separator)
    }
};

function formatKilometersValue(value, units){
    if (value > ONE_KILOMETER ){
       return [parseFloat(value).toFixed(2), units].join(separator);
    } else {
        /* Convert kilometers into meters*/
       return [parseFloat(value).toFixed(3) * 1000, "meters"].join(separator);
    }
};

const MapService = {
    getDistance
};

export default MapService;