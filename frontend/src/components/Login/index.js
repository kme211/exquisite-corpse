import React, { Component, PropTypes } from 'react'
import AuthService from 'utils/AuthService'

class Login extends Component {
  // We’ll add a constructor that checks if the user is already logged in or not and redirects to the home page when a user is logged in.
  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
      this.context.router.push('/home')
    })
  }

  render() {
    const { auth } = this.props
    if(this.state.profile.user_id){
      this.context.router.push('/home')
    }

    return (
      <div>
        <h2>Login</h2>
        <div>
          <button onClick={auth.loginEmailCode.bind(this)}>Login with Email Code</button>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.instanceOf(AuthService)
}

Login.contextTypes = {
  router: PropTypes.object
}

export default Login
