import React, { Component } from 'react'
import styled, {css} from 'styled-components'
//import { saveDrawing, getDrawing, addDrawingToLibrary } from 'controllers/drawing'
import { getSection, saveSection } from 'controllers/section'
import Canvas from 'components/Canvas'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import SavedModal from './SavedModal'
import { getAdjacentPositions, isPositionAdjacent } from 'utils'
import { getUser } from 'controllers/user'
import isEqual from 'lodash/isEqual'
import { STATUS } from 'components/globals'

const SAVE_BUTTON_TEXT = {
  SAVED: 'Saved!',
  SAVING: 'Saving...',
  NORMAL: 'Save'
}

class Drawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      drawing: '',
      section: '',
      showSavedModal: false,
      saveButtonText: SAVE_BUTTON_TEXT.NORMAL,
      image: null,
      scale: null,
      pos: [],
      width: 0,
      height: 0,
      sections: [],
      nextPos: []
    }
    this.handleStopDraw = this.handleStopDraw.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    const { drawing, section } = this.props.params
    //addDrawingToLibrary(id)
    getSection(section).then((res) => {
      const data = res.data
      this.setState({
        drawing: drawing,
        section: section,
        width: data.width,
        height: data.height,
        pos: data.pos,
        sections: data.sections
      })
    })
  }

  mapPosition(currentPos, pos) {
    let adjacentPosition
    if(pos[0] < currentPos[0]) adjacentPosition = 'left'
    if(pos[0] > currentPos[0]) adjacentPosition = 'right'
    if(pos[1] < currentPos[1]) adjacentPosition = 'top'
    if(pos[1] > currentPos[1]) adjacentPosition = 'bottom'
    return adjacentPosition
  }

  getAdjacentData(currentPos, canvasData) {
    return canvasData
      .map(data => {
        let adjacentPosition
        if(isPositionAdjacent(currentPos, data.pos)) {
          adjacentPosition = this.mapPosition(currentPos, data.pos)
        } else {
          adjacentPosition = null
        }
        return Object.assign({}, data, { adjacentPosition: adjacentPosition })
      })
  }

  handleStopDraw({ image, scale }) {
    console.log('handleStopDraw')
    this.setState({ image, scale }, () => {
      console.log('image state updated')
    })
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
    }, () => {
      console.log('saveButtonText updated')
      const { section, pos, drawing, image } = this.state
      saveSection({
        id: section,
        image: image,
        status: STATUS.COMPLETE,
        drawing: drawing,
        artist: 'kungfu.keari@gmail.com'
      }).then((res) => {
        let index = this.state.sections.findIndex(section => section.x === pos[0] && section.y === pos[1])
        console.log('response recieved', index)
        this.setState({
          saveButtonText: SAVE_BUTTON_TEXT.SAVED,
          sections: [
            ...this.state.sections.slice(0, index),
            res.data,
            ...this.state.sections.slice(index+1)
          ],
          showSavedModal: true
        })
      })


    })

  }

  render() {
    const { pos, nextPos, sections, saveButtonText, width, height, showSavedModal } = this.state
    const disabled = saveButtonText !== SAVE_BUTTON_TEXT.NORMAL
    const adjacentPositions = getAdjacentPositions(pos)
    const availableSections = sections.filter(section => section.status === STATUS.AVAILABLE)
    const completeSections = sections.filter(section => section.status === STATUS.COMPLETE)
    const borders = availableSections
      .filter(section => adjacentPositions.some(position => isEqual(position, section.pos)))
    return (
      <div>
          <h1>Drawing</h1>

          <Canvas
            position={pos}
            adjacentData={completeSections.filter(data => data.adjacentPosition)}
            disabled={disabled}
            borders={borders}
            onStopDraw={this.handleStopDraw}/>

            <SavedModal
              showSavedModal={showSavedModal}
              width={width}
              height={height}
              pos={pos}
              nextPos={nextPos}
              sections={sections}
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
