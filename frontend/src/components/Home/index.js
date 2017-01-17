import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import { getAllDrawings } from 'controllers/drawing'
import { getUser } from 'controllers/user'

class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      drawings: []
    }
  }
  
  componentDidMount() {
    this.fetchDrawings()
  }
  
  fetchDrawings() {
    this.setState({ drawings: getAllDrawings() })
  }
  
  render() {
    return (
      <div>
        <h1>Hi, {getUser().firstName}!</h1>
        <ul>
          {this.state.drawings.map(id => <li key={id}>{id}</li>)}
        </ul>
      </div>
    )
  }
}

export default Home
