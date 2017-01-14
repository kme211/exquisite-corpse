import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.input`
  margin: 0.5rem 0;
  display: block;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
`

const TextInput = (props) => {
  return (
    <Wrapper {...props}/>
  )
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired
}

export default TextInput
