import React, { PropTypes, Component } from 'react'
import styled, { css } from 'styled-components'

const styles = ({ disabled }) => css`
  background: white;
  margin: 1em auto;
  width: 500px;
  height: 500px;
  box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  pointer-events: ${disabled ? 'none' : 'auto'}
`

const Wrapper = styled.div`${styles}`

class Canvas extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isDrawing: false,
      lastX: 0,
      lastY: 0
    }
    this.draw = this.draw.bind(this)
    this.startDraw = this.startDraw.bind(this)
    this.stopDraw = this.stopDraw.bind(this)
    this.initializeCtx = this.initializeCtx.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  startDraw(e) {
    const [ lastX, lastY ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ];
    this.setState({
      lastX: lastX,
      lastY: lastY,
      isDrawing: true
    })
  }

  stopDraw(e) {
    this.setState({
      isDrawing: false
    })
    if(e.type === 'mouseout') return
    const imageData = this.ctx.getImageData(0, 0, 500, 500)
    this.props.onStopDraw(imageData)
  }

  draw(e) {
    if(!this.state.isDrawing) return
    this.ctx.beginPath()
    this.ctx.moveTo(this.state.lastX, this.state.lastY)
    this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    this.ctx.stroke()
    const [ lastX, lastY ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ];
    this.setState({
      lastX: lastX,
      lastY: lastY
    })

  }

  initializeCtx(canvas) {
    this.ctx = canvas.getContext('2d')
    this.ctx.strokeStyle = '#000'
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 15
  }

  render() {
    return (
    <Wrapper>
      <canvas
        width="500"
        height="500"
        ref={(canvas) => { this.initializeCtx(canvas) }}
        onMouseMove={this.draw}
        onMouseDown={this.startDraw}
        onMouseUp={this.stopDraw}
        onMouseOut={this.stopDraw}/>
      </Wrapper>
    )
  }
}

Canvas.propTypes = {
  onStopDraw: PropTypes.func
}

export default Canvas
