import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import { colors } from 'components/globals'

const styles = ({ width, disabled }) => css`
  width: ${width};
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  background: ${disabled ? colors.grayscale[2] : colors.primary[2]};
  border: none;
  color: white;
  padding: 1rem;
  transition: background 0.4s;
  cursor: ${disabled ? 'auto' : 'pointer'};
  pointer-events: ${disabled ? 'none' : 'auto'}

  &:hover {
    background: ${colors.primary[1]};
  }
`
const Wrapper = styled.button`${styles}`

const Button = (props) => {
  return <Wrapper {...props} > { props.children } </Wrapper>
}

export default Button

Button.propTypes = {
  children: PropTypes.node
}
