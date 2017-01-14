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

function storageAvailable(type) {
	try {
		const storage = window[type],
			x = '__storage_test__'
		storage.setItem(x, x)
		storage.removeItem(x)
		return true
	}
	catch(e) {
		return false
	}
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    if (storageAvailable('localStorage')) {
      if(window.localStorage.getItem('exquisite-corpse')) {
        console.log('app data is available')
      } else {
        this.context.router.push('/welcome')
      }
    }
    else {
      // i don't know yet
    }
  }

  render() {
    return (
      <Wrapper>
        <Header/>
        <Container>
          {this.props.children}
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
