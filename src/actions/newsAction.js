/**
 * 
 * @description: All News Action api are called here.
 * @exports : action defined for api call.
 * @memberof: newsAction.js 
 * 
 */

import * as types from "./actionType";
import APIUtil from "../config/APIUtil";
import UrlConstants from "../config/UrlConstants";




/**
 * @description:getting the mocky data from Api
 * @let : (url) for setting the url  for Api 
 * @returns response of Api
 */

export function actionGetNewsResponse() {
  
  let url = UrlConstants.BaseApiUrl;
  return function (dispatch) {
   
     return APIUtil.getMethod(url,true).then(response => {

      if (response.status === 200) {
        dispatch({
          type: types.NEWS,
          apiResponse: response.data
        })
      } else {
        dispatch({
          type: types.NEWS,
          apiResponse: []
        });
      } 
    })
  };
}

