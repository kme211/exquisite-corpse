import React, { PropTypes } from 'react'
import styled from 'styled-components'

const LabelWrapper = styled.label`
  margin: 0.5rem 0;
  display: block;
  text-transform: uppercase;
`

const Label = (props) => {
  return (
    <LabelWrapper {...props}>
      {props.children}
    </LabelWrapper>
  )
}

Label.propTypes = {
  children: PropTypes.node
}

export default Label
