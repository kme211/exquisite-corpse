import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import { Link } from 'react-router'

const linkStyle = css`
  font-family: inherit;
  font-size: 1rem;
  background: #58B3D3;
  border: none;
  color: white;
  transition: background 0.4s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #418C9F;
  }
`

const StyledLink = styled(Link)`
  ${linkStyle}
`

const HeaderLink = (props) => {
  return (
    <StyledLink {...props}>
      {props.children}
    </StyledLink>
  )
}

export default HeaderLink

HeaderLink.propTypes = {
  children: PropTypes.node
}