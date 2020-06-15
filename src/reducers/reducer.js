/**
 *
 * @description Redux reducer : all the cases of redux used in the entier project is defined here.
 */

import * as types from "../actions/actionType";

const initialState = {
  newsInformation: [],
  newsList: "",

};

const reducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    //set state data to initial state and return to action
   //  for newsInformation
    case types.NEWS:
      return Object.assign({}, state, {
        newsInformation: action.apiResponse,
      });
      // for news Details
      case types.NEWS_DETAIL:
      return Object.assign({}, state, {
        newsList: action.newsList,
      });
     

    default:
      // need this for default case
      return state;
  }
};
export default reducer;
