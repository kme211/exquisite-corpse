import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0.5rem;
  text-align: center;
`

const NextLink = ({ pos }) => {
  let href = window.location.href.split('/').slice(0, -2).concat(...pos).join('/')
  return <Wrapper>{href}</Wrapper>
}

NextLink.propTypes = {
  pos: PropTypes.array
}

export default NextLink