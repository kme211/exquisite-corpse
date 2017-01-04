import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from  './components/App'
import Home from './components/home'
import NewDrawing from './components/new'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/new" component={NewDrawing}/>
    </Route>
  </Router>
), document.getElementById('container'))
