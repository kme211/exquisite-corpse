import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import Icon from 'components/Icon'
import { Link } from 'react-router'

const Wrapper = styled.header`
  height: 50px;
  line-height: 50px;
  background: #333C4A;
  color: white;
  display: flex;
  justify-content: space-between;
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

const StyledLink = styled(Link)`
display: inline-block;
font-family: inherit;
font-size: 1rem;
background: #58B3D3;
border: none;
color: white;
transition: background 0.4s;
cursor: pointer;
height: 100%;
padding: 0 1rem;
text-decoration: none;

&:hover {
  background: #418C9F;
}
`

const Header = (props) => {
  return (
    <Wrapper>
      <div>
        <ButtonWrapper><Icon icon="menu"/></ButtonWrapper>
        <span>exquisite-corpse</span>
      </div>
      <div>
        <StyledLink to="/new">New drawing</StyledLink>
      </div>
    </Wrapper>
  )
}

export default Header
