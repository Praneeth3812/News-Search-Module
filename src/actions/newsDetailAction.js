import * as types from "./actionType";
//action for managing the newsDetail 

export const actionGetNewsDetail = news => dispatch =>
  dispatch({ type: types.NEWS_DETAIL, newsList: news });