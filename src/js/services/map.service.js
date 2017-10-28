import turf from "turf";

const separator = " ";

function getDistance(center, border, units){
    const from = turf.point([center.lng, center.lat]);
    const to = turf.point([border.lng, border.lat]);
    const value = turf.distance(from, to, units);
    return {
        label: getLabel(value, units),
        value
    };
};

function getLabel(value, units="kilometers"){
    switch(units){
        case "kilometers": return formatKilometersValue(value, units);
        default: return [parseFloat(value).toFixed(2), units].join(separator)
    }
};

function formatKilometersValue(value, units){
    if (value > 1 ){
       return [parseFloat(value).toFixed(2), units].join(separator);
    } else {
       return [parseFloat(value).toFixed(3) * 1000, "meters"].join(separator);
    }
};

const MapService = {
    getDistance
};

export default MapService;