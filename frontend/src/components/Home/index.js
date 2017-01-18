import React, { Component, PropTypes } from 'react'
import styled, {css} from 'styled-components'
import { getAllDrawings, getDrawing } from 'controllers/drawing'
import { getUser } from 'controllers/user'
import ListItem from './ListItem'

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`

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
    getAllDrawings().forEach(id => {
      getDrawing(id).then(res => {
        this.setState({
          drawings: this.state.drawings.concat(res.data)
        })
      })
    })
  }
  
  render() {
    return (
      <div>
        <h1>Hi, {getUser().firstName}!</h1>
        <List>
          {this.state.drawings.map(drawing => <ListItem key={drawing.id} {...drawing} />)}
        </List>
      </div>
    )
  }
}

export default Home
