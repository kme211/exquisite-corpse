
import React, { PropTypes } from 'react'
import styled from 'styled-components'

const LabelWrapper = styled.label`
  margin: 0.5rem 0;
  display: block;
  text-transform: uppercase;
`

const InputWrapper = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`

const SizeForm = ({ width, height, handleValueChange }) => {
  return (
    <div>
      <LabelWrapper htmlFor="width">Width</LabelWrapper>
      <InputWrapper
        type="range"
        name="width"
        max={5}
        min={1}
        value={width}
        onChange={handleValueChange}
      />
    
    <LabelWrapper htmlFor="height">Height</LabelWrapper>
      <InputWrapper
        type="range"
        name="height"
        max={5}
        min={1}
        value={height}
        onChange={handleValueChange}
      />
    </div>
  )
}

SizeForm.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleValueChange: PropTypes.func.isRequired
}

export default SizeForm