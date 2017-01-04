import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'

const Wrapper = styled.header`
  height: 50px;
  line-height: 50px;
  display: flex;
  text-align: center;
  background: #333C4A;
  color: white;
  & > * {
    flex: 1;
    box-sizing: border-box;
  }
`

const Header = (props) => {
  return (
    <Wrapper>
      <span>exquisite-corpse</span>
      {props.children}
    </Wrapper>
  )
}

export default Header;