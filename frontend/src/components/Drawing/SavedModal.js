import React, { PropTypes, Component } from 'react'
import NextLink from './NextLink'
import { getAdjacentPositions } from 'utils'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import isEqual from 'lodash/isEqual'
import Icon from 'components/Icon'
import Modal from 'components/common/Modal'
import styled, {css} from 'styled-components'

const CloseButton = styled.button`
  position: absolute;
  right: -20px
  top: -20px;
  height: 40px;
  width: 40px;
  background: #58B3D3;
  border-radius: 50%;
  border: none;
  color: white;
  transition: background 0.4s;
  cursor: pointer;
  padding: 0.5rem;
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.5);
  &:hover {
    background: #418C9F;
  }
`

class SavedModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.showSavedModal && nextProps.showSavedModal) {
      this.setState({ isOpen: true })
    }
  }

  handleCloseButtonClick() {
    this.setState({ isOpen: false })
  }

  render() {
    const { width, height, pos, nextPos, handleCellClick, canvasData } = this.props
    const enabledCells = getAdjacentPositions(pos).filter(pos => !canvasData.some(data => isEqual(pos, data.pos)))
    const completedCells = canvasData.map(data => {
      return {
        pos: data.pos,
        image: data.contributor
      }
    })
    console.log('nextPos', nextPos, 'enabledCells', enabledCells, 'completedCells', completedCells)

    return (
      <Modal theme="success" isOpen={this.state.isOpen}>
          <h1>Awesome!</h1>
          <h2>Now select the section you want to pass to the next person.</h2>
          <Grid
            width={width}
            height={height}
            enabledCells={enabledCells}
            handleCellClick={handleCellClick}
            selectedCellPos={nextPos}
            completedCells={completedCells}
          />
          <NextLink pos={nextPos}/>
          <CloseButton onClick={this.handleCloseButtonClick}><Icon icon="cross" size={20}/></CloseButton>
      </Modal>
    )
  }
}

SavedModal.propTypes = {
  showSavedModal: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pos: PropTypes.array.isRequired,
  nextPos: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  canvasData: PropTypes.array.isRequired
}

export default SavedModal
