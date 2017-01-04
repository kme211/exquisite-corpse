import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import Header from '../common/Header';
import HeaderButton from '../common/HeaderButton';

class NewDrawing extends Component {
  render() {
    return (
      <div>
        <Header>
          <span>New</span>
          <HeaderButton>Save and pass</HeaderButton>
        </Header>
        
      </div>
    )
  }
}

export default NewDrawing