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
      adjacentData: []
    }
    this.handleStopDraw = this.handleStopDraw.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    const { id, xPos, yPos } = this.props.params
    getDrawing(id).then((res) => {
      const drawing = res.data
      const pos = [xPos, yPos]
      const adjacentData = this.getAdjacentData(pos, drawing)
      this.setState({
        id: id,
        pos: pos,
        adjacentData: adjacentData
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
  
  getAdjacentData(currentPos, drawing) {
    console.log('getAdjacentData')
    let adjacentPositions = this.getAdjacentPositions(currentPos)
    return drawing.canvasData
      .filter(data => this.positionIsAdjacent(data.pos, adjacentPositions))
      .map(data => {
        let pos
        if(data.pos[0] < currentPos[0]) pos = 'left'
        if(data.pos[0] > currentPos[0]) pos = 'right'
        if(data.pos[1] < currentPos[1]) pos = 'top'
        if(data.pos[1] > currentPos[1]) pos = 'bottom'
        return Object.assign({}, data, { pos })
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
            adjacentData={this.state.adjacentData}
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
