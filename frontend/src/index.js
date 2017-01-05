import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from  'components/App'
import Home from 'components/Home'
import NewDrawing from 'components/NewDrawing'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/new" component={NewDrawing}/>
    </Route>
  </Router>
), document.getElementById('container'))
