import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import AuthService from 'utils/AuthService'
import App from  'components/App'
import Welcome from 'components/Welcome'
import Home from 'components/Home'
import NewDrawing from 'components/NewDrawing'
import Drawing from 'components/Drawing'
import Login from 'components/Login'
import { getUser } from 'controllers/user'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRoute component={Home} />
      <Route path="/new" component={NewDrawing} onEnter={requireAuth} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/drawings/:id/:xPos/:yPos" component={Drawing} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('container'))
