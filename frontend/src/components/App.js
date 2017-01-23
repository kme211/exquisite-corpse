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
    if (this.props.children) {
      console.info('children', this.props.route.auth)
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <Wrapper>
        <Header/>
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
