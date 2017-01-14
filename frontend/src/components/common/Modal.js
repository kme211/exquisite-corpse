import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import { colors } from 'components/globals'


const COLORS = {
  success: colors.success[1]
}

const overlayStyles = ({ isOpen }) => css`
  display: ${isOpen ? 'flex' : 'none'}
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.75);
  align-items: center;
  justify-content: center;
  text-align: center;
`

const innerStyles = ({ theme }) => css`
  position: relative;
  padding: 2rem;
  color: white;
  background: ${colors.primary[0]};
  max-width: 90%;
  border: 6px solid ${COLORS[theme]};
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.5);
`

const Overlay = styled.div`${overlayStyles}`
const Inner = styled.div`${innerStyles}`

const Modal = (props) => {
  return (
    <Overlay {...props}>
      <Inner {...props}>
        { props.children }

      </Inner>
    </Overlay>
  )
}

export default Modal

Modal.propTypes = {
  children: PropTypes.node
}
