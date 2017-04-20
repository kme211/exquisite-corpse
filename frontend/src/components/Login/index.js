import React, { Component, PropTypes } from 'react'
import AuthService from 'utils/AuthService'
import { getLastRoute } from 'utils/routerHelper'

class Login extends Component {
  // We’ll add a constructor that checks if the user is already logged in or not and redirects to the home page when a user is logged in.
  constructor(props, context) {
    super(props, context)

    this.state = {
      profile: props.auth.getProfile()
    }

    
  }

  componentDidMount() {
    console.log('login page mounted')
    console.log('router', this.props.router)
    this.props.auth.on('profile_updated', (profile) => {
      console.log('profile updated', profile.user_id)
      this.setState({ profile })
    })
  }

  render() {
    console.log('render login')
    const { auth } = this.props
    if(this.state.profile.user_id) {
      const lastRoute = getLastRoute()
      if(lastRoute) this.context.router.push(lastRoute)
      else this.context.router.push('/home')
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
