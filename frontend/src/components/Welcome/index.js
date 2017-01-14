import React, { PropTypes, Component } from 'react'
import styled, {css} from 'styled-components'
import { setUser } from 'controllers/user'
import Label from 'components/common/Label'
import TextInput from 'components/common/TextInput'

class Welcome extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }

    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSaveClick(e) {
    e.preventDefault()
    const { firstName, lastName, email } = this.state
    setUser({
      firstName,
      lastName,
      email,
      initials: (firstName[0] + lastName[0]).toLowerCase()
    })
    this.context.router.push('/')
  }

  handleChange(e) {
    let prop = {}
    prop[e.target.name] = e.target.value
    this.setState(prop)
  }

  render() {
    const { firstName, lastName, email } = this.state
    return (
      <div>
        <h1>Welcome!</h1>

        <Label htmlFor="firstName">First Name</Label>
        <TextInput name="firstName" type="text" onChange={this.handleChange} value={firstName}/>

        <Label htmlFor="lastName">Last Name</Label>
        <TextInput name="lastName" type="text" onChange={this.handleChange} value={lastName}/>

        <Label htmlFor="email">Email</Label>
        <TextInput name="email" type="text" onChange={this.handleChange} value={email}/>

        <input type="submit" value="Save" onClick={this.handleSaveClick}/>
      </div>
    )
  }
}

Welcome.contextTypes = {
  router: PropTypes.object
}

export default Welcome
