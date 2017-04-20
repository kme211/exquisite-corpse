import React, { Component, PropTypes } from 'react'

class Logout extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { auth } = this.props
        auth.logout()
    }

    render() {
        return (
            <div>
                <h1>You are now logged out</h1>
            </div>
        )
    }
}

export default Logout