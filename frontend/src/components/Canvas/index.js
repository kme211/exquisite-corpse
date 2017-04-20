import React, { PropTypes, Component } from 'react'
import styled, { css } from 'styled-components'

const styles = ({ disabled, width }) => css`
  user-select: none;
  position: relative;
  width: ${width};
  background: white;
  margin: 1em auto;
  box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  pointer-events: ${disabled ? 'none' : 'auto'}
`

const Wrapper = styled.div`${styles}`

const secretImgStyles = ({ pos, hasImage }) => css`
  user-select: none;
  position: absolute;
  overflow: hidden;
  pointer-events: none;
  background: ${hasImage ? 'transparent' : 'rgba(0, 0, 0, 0.15)'};
  left: ${pos === 'left' ? 0 : 'auto'};
  right: ${pos === 'right' ? 0 : 'auto'};
  top: ${pos === 'top' || pos === 'left' || pos === 'right' ? 0 : 'auto'};
  bottom: ${pos === 'bottom' ? 0 : 'auto'};
  height: ${pos === 'top' || pos === 'bottom' ? '25px' : '100%'};
  width: ${pos === 'left' || pos === 'right' ? '25px' : '100%'};
  & > img {
    position: absolute;
    top: ${pos === 'bottom' ? 0 : 'auto'};
    bottom: ${pos === 'top' ? 0 : 'auto'};
    right: ${pos === 'left' ? 0 : 'auto'};
    left: ${pos === 'right' ? 0 : 'auto'};
  }
`

const SecretImg = styled.div`${secretImgStyles}`

class Canvas extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      initialized: false,
      canvasWidth: '100%',
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      scale: 1
    }
    this.getTouchPos = this.getTouchPos.bind(this)
    this.draw = this.draw.bind(this)
    this.startDraw = this.startDraw.bind(this)
    this.stopDraw = this.stopDraw.bind(this)
    this.initializeCtx = this.initializeCtx.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.canvasWidth !== nextState.canvasWidth) return true
    if(nextProps.adjacentData.length > 0) return true
    if(nextProps.position !== this.props.position) return true
    console.log('no it should not update')
    return false
  }

  getTouchPos(e) {
    const touch = e.nativeEvent.touches[0]
    const target = e.nativeEvent.target
    return [ touch.clientX - target.offsetLeft, touch.clientY - target.offsetTop ]
  }

  startDraw(e) {
    let [ lastX, lastY ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]
    if(!lastX) [ lastX, lastY ] = this.getTouchPos(e)
    this.setState({
      lastX: lastX,
      lastY: lastY,
      isDrawing: true
    })
  }

  stopDraw(e) {
    console.warn('stopDraw')
    if(!this.state.isDrawing) return
    this.setState({
      isDrawing: false
    }, () => {
      const image = this.canvas.toDataURL()
      const scale = this.state.scale
      this.props.onStopDraw({ image, scale })
    })
  }

  draw(e) {
    if(!this.state.isDrawing) return
    this.ctx.beginPath()
    this.ctx.moveTo(this.state.lastX, this.state.lastY)
    let [ newX, newY ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]
    if(!newX) [ newX, newY ] = this.getTouchPos(e)
    this.ctx.lineTo(newX, newY)
    this.ctx.stroke()
    let [ lastX, lastY ] = [ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]
    if(!lastX) [ lastX, lastY ] = this.getTouchPos(e)
    this.setState({
      lastX: lastX,
      lastY: lastY
    })

  }

  initializeCtx(canvas) {
    if(this.state.initialized) return
    this.canvas = canvas
    const maxHeight = window.innerHeight - this.canvas.parentNode.offsetTop - 90 // 90 px gives room for button at bottom, just temporarily hard coded
    this.canvas.width = maxHeight
    this.canvas.height = maxHeight
    this.setState({ canvasWidth: `${maxHeight}px`})
    this.ctx = canvas.getContext('2d')
    this.ctx.strokeStyle = '#000'
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 15
    const ratio = this.canvas.width / 500
    const scale = 1 + (1 - ratio)
    this.setState({ initialized: true, scale: scale })
  }

  render() {
    console.log('adjacentData', this.props.adjacentData)
    return (
    <Wrapper width={this.state.canvasWidth}>

      <canvas
        ref={(canvas) => { this.initializeCtx(canvas) }}
        onMouseMove={this.draw}
        onTouchMove={this.draw}
        onMouseDown={this.startDraw}
        onTouchStart={this.startDraw}
        onMouseUp={this.stopDraw}
        onTouchEnd={this.stopDraw}
        onMouseOut={this.stopDraw}/>

        { this.props.adjacentData &&
          this.props.adjacentData
          .map(data => {
            return (
              <SecretImg
                key={`image-${data.pos}`}
                hasImage={data.image ? true : false}
                pos={data.adjacentPosition}>
                {data.image && <img alt="" src={data.image}/>}
              </SecretImg>
            )
          })}
      </Wrapper>
    )
  }
}

Canvas.propTypes = {
  onStopDraw: PropTypes.func.isRequired,
  adjacentData: PropTypes.array.isRequired,
  position: PropTypes.array.isRequired
}

export default Canvas
