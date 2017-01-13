import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import { saveDrawing, getDrawing } from 'controllers/drawing'
import Canvas from 'components/Canvas'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import Saved from './Saved'
import { getAdjacentPositions, isPositionAdjacent } from 'utils'

const STATUS = {
  SAVED: 'saved',
  SAVING: 'saving',
  NORMAL: 'normal'
}

class Drawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      id: '',
      status: STATUS.NORMAL,
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
    this.setState({ status: STATUS.SAVING })
    const { id, pos } = this.state
    saveDrawing({
      id: id,
      canvasData: {
        pos: pos,
        scale: this.state.scale,
        image: this.state.image
      }
    }).then(() => {
      this.setState({ status: STATUS.SAVED })
    })
  }

  render() {
    const { pos, nextPos, canvasData, status, width, height } = this.state
    const canvasIsDisabled = status === STATUS.SAVED || status === STATUS.SAVING
    return (
      <div>
          <h1>Drawing</h1>

          <Canvas
            position={pos}
            adjacentData={canvasData.filter(data => data.adjacentPosition)}
            disabled={canvasIsDisabled}
            onStopDraw={this.handleStopDraw}/>

          {status === STATUS.SAVED ?
            <Saved
              width={width}
              height={height}
              pos={pos}
              nextPos={nextPos}
              canvasData={canvasData}
              handleCellClick={this.handleCellClick}/> :
            <Button
              width="100%"
              onClick={this.handleSave}>
              {status === STATUS.SAVING ? 'Saving...' : 'Save'}
            </Button>
          }

      </div>
    )
  }
}

export default Drawing
