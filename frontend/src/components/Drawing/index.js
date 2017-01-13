import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import { saveDrawing, getDrawing } from 'controllers/drawing'
import Canvas from 'components/Canvas'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import Saved from './Saved'
import { getAdjacentPositions } from 'utils'

class Drawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      id: '',
      saved: false,
      image: null,
      scale: null,
      pos: [],
      width: 0,
      height: 0,
      canvasData: [],
      nextPos: null
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
  
  positionIsAdjacent(pos, adjacentPositions) {
    const posStr = pos.join(',')
    const adjacentPositionStrings = adjacentPositions.map(pos => pos.join(','))
    for(let i = 0; i < adjacentPositionStrings.length; i++) {
      if(posStr === adjacentPositionStrings[i]) return true
    }
    return false
  }
  
  getAdjacentData(currentPos, canvasData) {
    let adjacentPositions = getAdjacentPositions(currentPos)
    return canvasData
      .map(data => {
        let adjacentPosition
        if(this.positionIsAdjacent(data.pos, adjacentPositions)) {
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
    const { x, y } = e.target.dataset
    const nextPos = [parseInt(x), parseInt(y)]
    this.setState({ nextPos })
  }

  handleSave(e) {
    console.log('save')
    const { id, pos } = this.state
    saveDrawing({
      id: id,
      canvasData: {
        pos: pos,
        scale: this.state.scale,
        image: this.state.image
      }
    }).then(() => {
      this.setState({ saved: true })
    })
  }

  render() {
    const { pos, nextPos, canvasData, saved, width, height } = this.state
    return (
      <div>
          <h1>Drawing</h1>

          <Canvas
            position={pos}
            adjacentData={canvasData.filter(data => data.adjacentPosition)}
            disabled={saved}
            onStopDraw={this.handleStopDraw}/>

          {saved ?
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
              Save
            </Button>
          }

      </div>
    )
  }
}

export default Drawing
