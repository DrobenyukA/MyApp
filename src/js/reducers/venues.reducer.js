const venuesReducer = (state = [], action) => {
    switch (action.type) {
        case "LOGOUT":
            return [];
        default:
            return state;
    }
};

export default venuesReducer;