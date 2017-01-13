import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from  'components/App'
import Home from 'components/Home'
import NewDrawing from 'components/NewDrawing'
import Drawing from 'components/Drawing'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/new" component={NewDrawing}/>
      <Route path="/drawings/:id/:xPos/:yPos" component={Drawing}/>
    </Route>
  </Router>
), document.getElementById('container'))
