
import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Label from 'components/common/Label'

const InputWrapper = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`

const SizeForm = ({ width, height, handleValueChange }) => {
  return (
    <div>
      <Label htmlFor="width">Width</Label>
      <InputWrapper
        type="range"
        name="width"
        max={5}
        min={1}
        value={width}
        onChange={handleValueChange}
      />

    <Label htmlFor="height">Height</Label>
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
