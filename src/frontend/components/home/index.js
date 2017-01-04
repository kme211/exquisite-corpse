import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import Header from '../common/Header';
import HeaderLink from '../common/HeaderLink';

class Home extends Component {
  render() {
    return (
      <div>
        <Header>
          <span>Home</span>
          <HeaderLink to="/new">New drawing</HeaderLink>
        </Header>
        <h1>Welcome again!</h1>
      </div>
    )
  }
}

export default Home;