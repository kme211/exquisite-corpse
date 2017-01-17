import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from  'components/App'
import Welcome from 'components/Welcome'
import Home from 'components/Home'
import NewDrawing from 'components/NewDrawing'
import Drawing from 'components/Drawing'
import { getUser } from 'controllers/user'

function userDataFound(nextState, replace) {
  console.log('userDataFound')
  let userData = getUser()
  console.log(userData)
  if(!userData) replace('/welcome')
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={userDataFound} />
      <Route path="/new" component={NewDrawing} onEnter={userDataFound} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/drawings/:id/:xPos/:yPos" component={Drawing} onEnter={userDataFound} />
    </Route>
  </Router>
), document.getElementById('container'))
