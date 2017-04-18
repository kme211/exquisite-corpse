import React, { Component, PropTypes } from 'react'
import styled, {css} from 'styled-components'
import AuthService from 'utils/AuthService'
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
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  // componentDidMount() {
  //   this.fetchDrawings()
  // }
  //
  // fetchDrawings() {
  //   getAllDrawings().forEach(id => {
  //     getDrawing(id).then(res => {
  //       this.setState({
  //         drawings: this.state.drawings.concat(res.data)
  //       })
  //     })
  //   })
  // }

  render() {
     const { profile } = this.state
    //  const ListOfDrawings = (
    //    <List>
    //      {this.state.drawings.map(drawing => <ListItem key={drawing.id} {...drawing} />)}
    //    </List>
    //  )
    return (
      <div>
        <h1>Home</h1>
        <h2>Hi, {profile.name}!</h2>

      </div>
    )
  }
}

Home.propTypes = {
  auth: PropTypes.instanceOf(AuthService)
}

Home.contextTypes = {
  router: PropTypes.object
}

export default Home
