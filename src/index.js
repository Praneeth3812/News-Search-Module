/* eslint-disable import/first */

import "babel-polyfill";

//import 'react-app-polyfill/ie11';
//import 'react-app-polyfill/stable';

import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createBrowserHistory } from "history";
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";
import { createStore } from 'redux';
import App from './App';
import reducer from './reducers/reducer';
import * as serviceWorker from './serviceWorker';
import './styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

config.autoAddCss = false;
library.add();
// Wrap the rendering in a function:
setConfig({
  showReactDomPatchNotification: false
})


const store = createStore(reducer)
const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history} >
    <AppContainer>
      <Provider store={store}><App /></Provider>
    </AppContainer>
    </Router>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Render once
//Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    // render();
  });
}
