import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewsDetail from './components/NewsDetails';
import HomePage from '../src/container/HomePage'

export class Routes extends Component {
 
 
  render() {
    return (
    
       <Switch>
          <Route path="/homepage" exact component={HomePage}  />
          <Route path="/newsDetail" exact component={NewsDetail}  />

          <Redirect from="/" to="/homepage" />
        </Switch>
     
    );
  }
}
export default Routes;
