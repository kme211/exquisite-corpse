import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'

const Wrapper = styled.button`
  font-family: inherit;
  font-size: 1rem;
  background: #58B3D3;
  border: none;
  color: white;
  transition: background 0.4s;
  cursor: pointer;

  &:hover {
    background: #418C9F;
  }
`

const HeaderButton = (props) => {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}

export default HeaderButton;