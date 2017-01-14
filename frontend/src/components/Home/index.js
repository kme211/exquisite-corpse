import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import { getUser } from 'controllers/user'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hi, {getUser().firstName}!</h1>

      </div>
    )
  }
}

export default Home
