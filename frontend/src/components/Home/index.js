import React, { Component, PropTypes } from 'react'
import styled, {css} from 'styled-components'
import AuthService from 'utils/AuthService'
import ListItem from './ListItem'
import { getUser, newUser } from 'controllers/user'

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      drawings: [],
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

    this.handleUserResponse = this.handleUserResponse.bind(this)
  }

  componentDidMount() {
    const { profile } = this.state

    getUser(profile.user_id)
        .then(this.handleUserResponse)
        .catch((err) => {
          console.log('err trying to get user', err)
          newUser(profile.user_id, profile.email)
            .then(this.handleUserResponse)
            .catch((err) => console.log('err creating new user', err))
        })
  }

  handleUserResponse(response) {
    this.setState({ drawings: response.data.drawings })
  }

  render() {
     const { profile, drawings } = this.state

     const ListOfDrawings = (
       <List>
         {drawings.map(drawing => <ListItem key={drawing._id} {...drawing} />)}
       </List>
     )
    return (
      <div>
        <h1>Home</h1>
        <h2>Hi, {profile.name}!</h2>
        {ListOfDrawings}
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
