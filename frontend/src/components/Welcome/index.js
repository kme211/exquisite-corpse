import React, { PropTypes, Component } from 'react'
import styled, {css} from 'styled-components'
import { setUser } from 'controllers/user'
import Label from 'components/common/Label'
import TextInput from 'components/common/TextInput'

class Welcome extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSaveClick(e) {
    e.preventDefault()
    this.context.router.push('/home')
  }

  handleChange(e) {
    let prop = {}
    prop[e.target.name] = e.target.value
    this.setState(prop)
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
      </div>
    )
  }
}

Welcome.contextTypes = {
  router: PropTypes.object
}

export default Welcome
