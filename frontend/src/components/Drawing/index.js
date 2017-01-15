import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import { saveDrawing, getDrawing } from 'controllers/drawing'
import Canvas from 'components/Canvas'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import SavedModal from './SavedModal'
import { getAdjacentPositions, isPositionAdjacent } from 'utils'
import { getUser } from 'controllers/user'

const SAVE_BUTTON_TEXT = {
  SAVED: 'Saved!',
  SAVING: 'Saving...',
  NORMAL: 'Save'
}

class Drawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      id: '',
      showSavedModal: false,
      saveButtonText: SAVE_BUTTON_TEXT.NORMAL,
      image: null,
      scale: null,
      pos: [],
      width: 0,
      height: 0,
      canvasData: [],
      nextPos: []
    }
    this.handleStopDraw = this.handleStopDraw.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    const { id, xPos, yPos } = this.props.params
    getDrawing(id).then((res) => {
      const drawing = res.data
      const pos = [parseInt(xPos), parseInt(yPos)]
      const canvasData = this.getAdjacentData(pos, drawing.canvasData)
      this.setState({
        id: id,
        width: drawing.width,
        height: drawing.height,
        pos: pos,
        canvasData: canvasData
      })
    })
  }

  getAdjacentData(currentPos, canvasData) {
    return canvasData
      .map(data => {
        let adjacentPosition
        if(isPositionAdjacent(currentPos, data.pos)) {
          if(data.pos[0] < currentPos[0]) adjacentPosition = 'left'
          if(data.pos[0] > currentPos[0]) adjacentPosition = 'right'
          if(data.pos[1] < currentPos[1]) adjacentPosition = 'top'
          if(data.pos[1] > currentPos[1]) adjacentPosition = 'bottom'
        } else {
          adjacentPosition = null
        }
        return Object.assign({}, data, { adjacentPosition: adjacentPosition })
      })
  }

  handleStopDraw({ image, scale }) {
    this.setState({ image, scale })
  }

  handleCellClick(e) {
    console.log('handleCellClick')
    const { x, y } = e.target.dataset
    const nextPos = [parseInt(x), parseInt(y)]
    this.setState({ nextPos })
  }

  handleSave(e) {
    console.log('save')
    this.setState({
      saveButtonText: SAVE_BUTTON_TEXT.SAVING
    })
    const { id, pos } = this.state
    saveDrawing({
      id: id,
      canvasData: {
        contributor: {
          email: getUser().email,
          initials: getUser().initials
        },
        pos: pos,
        scale: this.state.scale,
        image: this.state.image
      }
    }).then((res) => {
      this.setState({
        saveButtonText: SAVE_BUTTON_TEXT.SAVED,
        canvasData: res.data,
        showSavedModal: true
      })
    })
  }

  render() {
    const { pos, nextPos, canvasData, saveButtonText, width, height, showSavedModal } = this.state
    const disabled = saveButtonText !== SAVE_BUTTON_TEXT.NORMAL
    return (
      <div>
          <h1>Drawing</h1>

          <Canvas
            position={pos}
            adjacentData={canvasData.filter(data => data.adjacentPosition)}
            disabled={disabled}
            onStopDraw={this.handleStopDraw}/>

            <SavedModal
              showSavedModal={showSavedModal}
              width={width}
              height={height}
              pos={pos}
              nextPos={nextPos}
              canvasData={canvasData}
              handleCellClick={this.handleCellClick}/>

            <Button
              width="100%"
              onClick={this.handleSave}
              disabled={disabled}>
              {saveButtonText}
            </Button>

      </div>
    )
  }
}

export default Drawing
