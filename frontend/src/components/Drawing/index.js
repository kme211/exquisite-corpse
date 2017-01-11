import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import Canvas from 'components/Canvas'
import Button from 'components/common/Button'
import { saveDrawing } from 'controllers/drawing'

class Drawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      saved: false,
      imageData: null
    }

    this.handleStopDraw = this.handleStopDraw.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleStopDraw(imageData) {
    console.log('stopDraw', imageData)
    this.setState({ imageData })
  }

  handleSave(e) {
    console.log('save', this.state.imageData)
    const data = this.state.imageData.data
    const buffer = new ArrayBuffer(data.length)
    let binary = new Uint8Array(buffer)
    const LEN = binary.length
    for (let i=0; i < LEN; i++) {
        binary[i] = data[i]
    }
    saveDrawing({
      id: this.props.params.id,
      canvasData: {
        pos: [],
        imageData: binary
      }
    }).then(() => {
      this.setState({ saved: true })
    })
  }

  render() {
    return (
      <div>
          <h1>Drawing {this.props.params.id}</h1>

          <Canvas
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
