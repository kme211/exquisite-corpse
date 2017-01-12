import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import { saveDrawing, getDrawing } from 'controllers/drawing'
import Canvas from 'components/Canvas'
import Button from 'components/common/Button'

class Drawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      id: '',
      saved: false,
      image: null,
      scale: null,
      pos: [],
      canvasData: []
    }
    this.handleStopDraw = this.handleStopDraw.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    const { id, xPos, yPos } = this.props.params
    getDrawing(id).then((res) => {
      const drawing = res.data
      const pos = [xPos, yPos]
      const canvasData = this.getAdjacentData(pos, drawing.canvasData)
      this.setState({
        id: id,
        pos: pos,
        canvasData: canvasData
      })
    })
  }
  
  getAdjacentPositions(pos) {
    const [ x, y ] = pos
    let adjacentPositions = [
      [x - 1, y], 
      [x + 1, y], 
      [x, y - 1], 
      [x, y + 1]
    ]
    return adjacentPositions
      .filter(position => position.every(num => num >= 0))
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
    let adjacentPositions = this.getAdjacentPositions(currentPos)
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

  handleSave(e) {
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
    return (
      <div>
          <h1>Drawing</h1>

          <Canvas
            position={this.state.pos}
            adjacentData={this.state.canvasData.filter(data => data.adjacentPosition)}
            disabled={this.state.saved}
            onStopDraw={this.handleStopDraw}/>

          {this.state.saved ?
            <h2>Saved!</h2> :
            <Button
              width="100%"
              onClick={this.handleSave}>
              Save and Pass
            </Button>
          }

      </div>
    )
  }
}

export default Drawing
