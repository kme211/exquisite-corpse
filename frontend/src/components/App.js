import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { fonts, baseFontSize, maxContainerWidth } from 'components/globals'
import Header from 'components/common/Header'


const Wrapper = styled.div`
  font-size: ${baseFontSize}px;
  font-family: ${fonts.primary};
  padding: 0;
  margin: 0;
`

const Container = styled.div`
  max-width: ${maxContainerWidth}px;
  margin: 0 auto;
  padding: 1rem;
`

class App extends React.Component {
  render() {
    let children = null
    const auth = this.props.route.auth
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: auth //sends auth instance to children
      })
    }

    return (
      <Wrapper>
        <Header isLoggedIn={auth.loggedIn()} />
        <Container>
          {children}
        </Container>
      </Wrapper>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
