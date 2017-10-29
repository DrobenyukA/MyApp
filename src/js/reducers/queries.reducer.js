import {QUERIES} from "../constants/action.constants";

const initialState = [];

const queriesReducer = (state = initialState, action) => {
  switch (action.type){
      case QUERIES.ADD: return [...state, action.payload];
      case QUERIES.DELETE: return state.filter(query => query.time !== action.payload);
      default: return state;
  }
};

export default queriesReducer;