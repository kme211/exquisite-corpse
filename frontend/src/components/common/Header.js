import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import Icon from 'components/Icon'

const Wrapper = styled.header`
  height: 50px;
  line-height: 50px;
  background: #333C4A;
  color: white;
`

const ButtonWrapper = styled.button`
font-family: inherit;
font-size: 1rem;
background: #58B3D3;
border: none;
color: white;
transition: background 0.4s;
cursor: pointer;
height: 100%;
margin: 0 1rem 0 0;
padding: 0 1rem;

&:hover {
  background: #418C9F;
}
`

const Header = (props) => {
  return (
    <Wrapper>
      <ButtonWrapper><Icon icon="menu"/></ButtonWrapper>
      <span>exquisite-corpse</span>
    </Wrapper>
  )
}

export default Header