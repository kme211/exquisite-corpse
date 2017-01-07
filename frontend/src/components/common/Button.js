import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'

const styles = ({ width }) => css`
  width: ${width};
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  background: #58B3D3;
  border: none;
  color: white;
  padding: 1rem;
  transition: background 0.4s;
  cursor: pointer;

  &:hover {
    background: #418C9F;
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
